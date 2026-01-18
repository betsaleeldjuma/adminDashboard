import { useState } from "react"
// import { useImagePreview } from "../hooks/useImagePreview"
// import { IoIosAddCircleOutline } from "react-icons/io"
// import { FaUser } from "react-icons/fa"
import IconInput from "../components/IconInput"
import { MdEmail, MdLock, MdLogin } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { FaApple, FaFacebook } from "react-icons/fa"

const UserNew = () => {
  const [form, setForm] = useState({
    email: "",
    password: '',
  })

  // const [imageFile, setImageFile] = useState<File | null>(null)
  // const preview = useImagePreview(imageFile)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    )

    // if (imageFile) {
    //   formData.append("image", imageFile)
    // }

    // POST /users
    console.log("CREATE USER", formData)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card p-5 max-w-2xl w-[90%] lg:w-[60%] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
          {/* HEADER */}
          <div className="bg-white p-5 w-[15%] h-[10%] rounded-4xl shadow-xl flex justify-center items-center">
            <MdLogin size={50}/>
          </div>
          <div className="flex flex-col justify-center items-center w-[60%]">
            <h1 className="font-bold text-2xl">Sign in with Email</h1>
            <p className="text-center opacity-60">Make a new doc to bring your words, data, and teams togother. For free</p>
          </div>
          {/* FORM */}
          <div className="w-[90%]">
            <IconInput
              icon={<MdEmail />}
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <IconInput
              type="password"
              icon={<MdLock />}
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <p className="text-end">Forgot password?</p>
          </div>
          <div className="w-[100%] flex flex-col justify-center items-center gap-4">
            <button className="w-[90%] py-3 rounded-xl bg-gradient-to-b from-zinc-800 to-black text-white font-medium shadow-lg hover:scale-[1.02] transition flex justify-center items-center gap-2">
              <p>Get Started</p>
            </button>
            <p className="opacity-60">Or sign in with</p>
            <div className="flex justify-center items-center gap-4">
              <button className="bg-white shadow-4xl rounded-lg p-5"><FcGoogle size={30}/></button>
              <button className="bg-white shadow-4xl rounded-lg p-5"><FaFacebook className="text-blue-700"size={30}/></button>
              <button className="bg-white shadow-4xl rounded-lg p-5"><FaApple className="text-black"size={30}/></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserNew