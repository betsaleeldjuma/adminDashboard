import { Navigate, Route, Routes } from "react-router"
import Login from "./routes/Login"
import Dashboard from "./routes/Dashboard"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App