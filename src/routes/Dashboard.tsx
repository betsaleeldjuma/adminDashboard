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
import Loading from "../components/Loading";

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

  if (!users || !carts || !products) return <div className="flex justify-center items-center w-screen h-screen"><Loading /></div>;

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
        <Link to="/users">
          <StatCard
            title="Total Users"
            value={totalUsers}
            bgColor="bg-[#8E1616]"
          />
        </Link>
        <Link to="/orders">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            bgColor="bg-[#8E1616]"
          />
        </Link>
        <Link to="/products">
          <StatCard
            title="Total Products"
            value={totalProducts}
            bgColor="bg-[#8E1616]"
          />
        </Link>
      </div>

      {/* GRAPHIC */}
      <div className="bg-[#8E1616] p-4 pb-10 rounded-xl h-55 lg:h-80 w-full">
        <h2 className="text-white mb-4 opacity-70">Revenue by Order</h2>

        <ResponsiveContainer width="100%" aspect={1.5}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#EEEEEE" />
            <YAxis stroke="#EEEEEE" />
            <Tooltip />
            <Bar dataKey="total" fill="#1D1616" />
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
  bgColor = "bg-[#3C415C]", // couleur par défaut
}: {
  title: string;
  value: number | string;
  bgColor?: string;
}) => (
  <div
    className={`${bgColor} p-4 rounded-xl text-white shadow-lg hover:scale-105 transition-transform`}
  >
    <p className="text-sm opacity-70">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;
