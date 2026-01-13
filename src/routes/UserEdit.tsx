import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { useImagePreview } from "../hooks/useImagePreview"

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

  useEffect(() => {
    // GET /users/:id
    // api.get(`/users/${id}`).then(res => setForm(res.data))
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value)
    })

    if (imageFile) {
      formData.append("image", imageFile)
    }

    // PUT /users/:id
    console.log("UPDATE USER", id, formData)
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* AVATAR */}
        <div className="flex items-center gap-4">
          <img
            src={preview ?? "/avatar-placeholder.png"}
            className="w-20 h-20 rounded-full object-cover border"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <input
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button className="bg-[#8E1616] text-white p-3 rounded">
          Save
        </button>
      </form>
    </div>
  )
}

export default UserEdit
