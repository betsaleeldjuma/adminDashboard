import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiClient from "../api/apiClient";
import { Link } from "react-router";

/* ==============================
   TYPES
============================== */

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
}

interface UsersResponse {
  users: User[];
  total: number;
}

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

interface Cart {
  id: number;
  userId: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  products: CartProduct[];
}

interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

/* ==============================
   API FETCH
============================== */

const fetchUsersCount = async (): Promise<number> => {
  const res = await apiClient.get<UsersResponse>("/users");
  return res.data.total;
};

const fetchOrders = async (): Promise<Cart[]> => {
  const res = await apiClient.get<CartsResponse>("/carts");
  return res.data.carts;
};

const fetchProductsCount = async (): Promise<number> => {
  const res = await apiClient.get("/products");
  return res.data.total;
};

/* ==============================
   DASHBOARD
============================== */

const Dashboard = () => {
  const { data: users } = useQuery({
    queryKey: ["users-count"],
    queryFn: fetchUsersCount,
  });

  const { data: carts } = useQuery({
    queryKey: ["orders-data"],
    queryFn: fetchOrders,
  });

  const { data: products } = useQuery({
    queryKey: ["products-count"],
    queryFn: fetchProductsCount,
  });

  if (!users || !carts || !products) return <p>Loading dashboard...</p>;

  /* ==============================
     STATS
  ============================== */

  const totalOrders = carts.length;
  const totalProducts = products;
  const totalUsers = users;

  /* ==============================
     DATA POUR LE GRAPH
  ============================== */

  const chartData = carts.map((cart, index) => ({
    name: `Order ${index + 1}`,
    total: cart.total,
    products: cart.totalProducts,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to='/users'><StatCard title="Total Users" value={totalUsers} /></Link>
        <Link to='/orders'><StatCard title="Total Orders" value={totalOrders} /></Link>
        <Link to='/products'><StatCard title="Total Products" value={totalProducts} /></Link>
      </div>

      {/* GRAPHIC */}
      <div className="bg-[#3C415C] p-4 pb-10 rounded-xl h-80 w-full">
        <h2 className="text-white mb-4">Revenue per Order</h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="total" fill="#ff7f50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ==============================
   KPI CARD
============================== */

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) => (
  <div className="bg-[#3C415C] p-4 rounded-xl text-white">
    <p className="text-sm opacity-70">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;
