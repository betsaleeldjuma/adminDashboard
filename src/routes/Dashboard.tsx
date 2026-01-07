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

/* ==============================
   TYPES
============================== */

interface Cart {
  id: number;
  total: number;
  totalProducts: number;
}

interface CartsResponse {
  carts: Cart[];
  total: number;
}

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

/* ==============================
   API (FETCH)
============================== */

const fetchCarts = async (): Promise<CartsResponse> => {
  const res = await apiClient.get("/carts");
  return res.data;
};

const fetchUsers = async (): Promise<UsersResponse> => {
  const res = await apiClient.get("/users");
  return res.data;
};

/* ==============================
   DASHBOARD
============================== */

const Dashboard = () => {
  const cartsQuery = useQuery({
    queryKey: ["dashboard-carts"],
    queryFn: fetchCarts,
  });

  const usersQuery = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: fetchUsers,
  });

  if (cartsQuery.isLoading || usersQuery.isLoading)
    return <p>Loading dashboard...</p>;

  if (cartsQuery.isError || usersQuery.isError || !cartsQuery.data || !usersQuery.data)
    return <p>Error loading dashboard</p>;

  const { carts, total } = cartsQuery.data;

  /* ==============================
     STATS (CALCULS)
  ============================== */

  const totalOrders = carts.length;

  const totalRevenue = carts.reduce(
    (sum, cart) => sum + cart.total,
    0
  );

  const avgOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const totalUsers = usersQuery.data.total;

  /* ==============================
     DATA POUR LE GRAPH
  ============================== */

  const chartData = carts.map((cart, index) => ({
    name: `Order ${index + 1}`,
    total: cart.total,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* ==============================
          KPI CARDS
      ============================== */}

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Revenue" value={`$${totalRevenue}`} />
        <StatCard
          title="Avg Order"
          value={`$${avgOrderValue.toFixed(2)}`}
        />
        <StatCard title="Carts Count" value={total} />
        <StatCard title="Total Users" value={totalUsers} />
      </div>

      {/* ==============================
          CHART
      ============================== */}

      <div className="bg-[#3C415C] p-4 pb-10 rounded-xl h-80 w-full">
        <h2 className="text-white mb-4">Orders Revenue</h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ==============================
   KPI CARD COMPONENT
============================== */

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="bg-[#3C415C] p-4 rounded-xl text-white">
    <p className="text-sm opacity-70">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;