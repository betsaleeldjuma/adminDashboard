import { Navigate, Route, Routes } from "react-router"
import Login from "./routes/Login"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App