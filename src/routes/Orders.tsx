import { usePaginatedQuery } from "../hooks/usePaginatedQuery";
import { usePagination } from "../hooks/usePagination";
import type { Cart, CartProduct } from "../types/cart"; // créer types
import { useState } from "react";

const Orders = () => {
  const { page, limit, next, prev } = usePagination(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = usePaginatedQuery<Cart>({
    key: "orders",
    endpoint: "/carts",
    page,
    limit,
    q: search,
    sort: "id_asc",
  });

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders</p>;
  if (!data) return <p>No orders found</p>;

  // KPI
  const totalOrders = data.total;
  const totalProducts = data.data.reduce(
    (sum, order) => sum + order.totalProducts,
    0
  );
  const totalRevenue = data.data.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">ORDERS</h1>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search orders..."
        className="border p-2 rounded"
      />

      {/* KPI */}
      <div className="grid grid-row-3 gap-4 my-4">
        <div className="bg-[#8E1616] text-white p-4 rounded">
          <p className="text-sm opacity-70">Total Orders</p>
          <h2 className="text-2xl font-bold">{totalOrders}</h2>
        </div>
        <div className="bg-[#EEEEEE] text-[#8E1616] p-4 rounded">
          <p className="text-sm opacity-70">Total Products</p>
          <h2 className="text-2xl font-bold">{totalProducts}</h2>
        </div>
        <div className="bg-[#8E1616] text-white p-4 rounded">
          <p className="text-sm opacity-70">Total Revenue</p>
          <h2 className="text-2xl font-bold">${totalRevenue}</h2>
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="flex flex-col gap-4">
        {data.data.map((order) => (
          <div
            key={order.id}
            className="bg-[#EEEEEE] text-[#8E1616] p-4 rounded flex flex-col gap-2"
          >
            <p>
              <span className="font-bold">Order ID:</span> {order.id} |{" "}
              <span className="font-bold">User ID:</span> {order.userId}
            </p>
            <p>
              <span className="font-bold">Total Products:</span>{" "}
              {order.totalProducts} | <span className="font-bold">Total Quantity:</span>{" "}
              {order.totalQuantity}
            </p>
            <p>
              <span className="font-bold">Total:</span> ${order.total}
            </p>
            {/* LISTE DES PRODUITS */}
            <div className="ml-4">
              {order.products.map((prod: CartProduct) => (
                <p key={prod.id}>
                  {prod.title} x{prod.quantity} - ${prod.total}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-4 mt-4">
        <button onClick={prev} disabled={page === 1} className="p-2 bg-[#8E1616] text-white rounded">
          Prev
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={next}
          disabled={page * limit >= data.total}
          className="p-2 bg-[#8E1616] text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
