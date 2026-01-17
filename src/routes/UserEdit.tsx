import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { useImagePreview } from "../hooks/useImagePreview"
import apiClient from "../api/apiClient" // ton axios/fetch wrapper
import ErrorState from "../components/ErrorState"
import Loading from "../components/Loading"

const UserEdit = () => {
  const { id } = useParams<{ id: string }>()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    image: "", // URL existante
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const preview = useImagePreview(imageFile, form.image)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // GET user
  useEffect(() => {
  if (!id) return

  const numericId = Number(id)
  if (isNaN(numericId)) {
    setError("ID utilisateur invalide")
    setLoading(false)
    return
  }

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await apiClient.get(`/users/${numericId}`)
      setForm((prev) => ({ ...prev, ...res.data }))
    } catch {
      setError("Impossible de récupérer l'utilisateur.")
    } finally {
      setLoading(false)
    }
  }

  fetchUser()
}, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value)
    })

    if (imageFile) formData.append("image", imageFile)

    apiClient
      .put(`/users/${id}`, formData)
      .then(() => alert("Utilisateur Update !"))
      .catch((err) => console.error("Update failed:", err))
  }

  if (loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loading />
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <ErrorState />
      </div>
    )

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card flex flex-col p-5 max-w-2xl w-[60%] justify-center mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* AVATAR avec overlay */}
          <label className="relative w-20 h-20 cursor-pointer group">
            <img
              src={preview || "/avatar-placeholder.png"}
              alt="User avatar"
              className="w-20 h-20 rounded-full object-cover border"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">Upload</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <input
            value={form.firstName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className="border p-2 rounded"
            placeholder="First Name"
          />

          <input
            value={form.lastName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, lastName: e.target.value }))
            }
            className="border p-2 rounded"
            placeholder="Last Name"
          />

          <input
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="border p-2 rounded"
            placeholder="Email"
            type="email"
          />

          <select
            value={form.gender}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, gender: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button className="w-[100%] py-3 rounded-xl bg-gradient-to-b from-zinc-800 to-black text-white font-medium shadow-lg hover:scale-[1.02] transition">Save</button>
        </form>
      </div>
    </div>
  )
}

export default UserEdit
