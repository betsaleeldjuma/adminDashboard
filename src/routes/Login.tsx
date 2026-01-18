import { useState } from "react"
import { useNavigate } from "react-router"
import { useLogin } from "../hooks/useLogin"
import { MdLogin } from "react-icons/md"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginMutation = useLogin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate(
        {username, password},
        {onSuccess: () => navigate('/dashboard')}
        )
    }
    
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 w-screen h-screen">
      <div className="card flex flex-col justify-center items-center gap-4 w-[90%] lg:w-[80%] h-[60%] bg-[#8E1616] rounded-lg shadow-lg">
        <div className="bg-white p-8 lg:p-10 w-[15%] h-[10%] rounded-2xl lg:rounded-4xl shadow-xl flex justify-center items-center">
          <MdLogin size={50}/>
        </div>
        <label className="text-xl font-bold">Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-[80%] rounded-sm"/>
        <label className="text-xl font-bold">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-[80%] rounded-sm"/>
        <button type="submit" className="w-[80%] py-3 rounded-xl bg-gradient-to-b from-zinc-800 to-black text-white font-medium shadow-lg hover:scale-[1.02] transition flex justify-center items-center gap-2">
          <p>Login</p>
        </button>
      </div>
        
    </form>
  )
}

export default Login