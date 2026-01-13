import { Navigate, Route, Routes } from "react-router"
import Login from "./routes/Login"
import Dashboard from "./routes/Dashboard"
import Users from "./routes/Users"
import Products from "./routes/Products"
import Orders from "./routes/Orders"
import UserNew from "./routes/UserNew"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/new" element={<UserNew />} />
      <Route path="/users/:id/edit" element={<UserNew />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  )
}

export default App