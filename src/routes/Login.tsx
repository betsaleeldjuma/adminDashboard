import { useState } from "react"
import { useNavigate } from "react-router"
import { useLogin } from "../hooks/useLogin"

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
      <div className="flex flex-col justify-center items-center gap-4 w-[80%] h-[60%] bg-[#8E1616] rounded-lg shadow-lg">
        <label className="text-xl font-bold">Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-[40%] rounded-sm"/>
        <label className="text-xl font-bold">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-[40%] rounded-sm"/>
        <button type="submit" className="bg-[#D84040] p-2 rounded-lg  hover:shadow-[0_0_3px_#EEEEEE] w-[40%]">Login</button>
      </div>
        
    </form>
  )
}

export default Login