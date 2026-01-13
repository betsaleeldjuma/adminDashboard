import { useState } from "react"
import { useImagePreview } from "../hooks/useImagePreview"

const UserNew = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const preview = useImagePreview(imageFile)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    )

    if (imageFile) {
      formData.append("image", imageFile)
    }

    // POST /users
    console.log("CREATE USER", formData)
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New User</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* AVATAR avec overlay */}
        <label className="flex justify-center items-center gap-8">
          <img
            src={preview ?? "/avatar-placeholder.png"}
            alt="User avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />

          {/* Overlay */}
          
          <p><span className="text-white text-xl font-extrabold uppercase">Add</span></p>
          

          {/* Input caché */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </label>


        <input
          placeholder="First name"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Last name"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button className="bg-[#8E1616] text-white p-3 rounded">
          Create
        </button>
      </form>
    </div>
  )
}

export default UserNew