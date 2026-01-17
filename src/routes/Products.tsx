import { useState } from "react";
import { usePaginatedQuery } from "../hooks/usePaginatedQuery";
import { usePagination } from "../hooks/usePagination";
import type { Product } from "../types/product";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const Products = () => {
  const [search, setSearch] = useState("");

  const { page, limit, next, prev } = usePagination(10);

  const { data, isLoading, isError } = usePaginatedQuery<Product, "/products">({
  key: "products",
  endpoint: "/products",
  page,
  limit,
  q: search,
  sort: "price_desc",
});

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loading />
      </div>
    )

  if (isError || !data)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <ErrorState />
      </div>
    )

  if (data.data.length === 0)
    return (
      <div className="flex justify-center items-center w-screen h-screen lg:w-[50%] lg:h-[50%]">
        <EmptyState />
      </div>
    )

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-extrabold text-2xl lg:text-4xl">
        PRODUCTS
      </h1>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search product..."
        className="border p-2 rounded"
      />

      {/* LIST */}
      <div className="flex flex-col gap-4">
        {data.data.map((product) => (
          <div
            key={product.id}
            className="bg-[#8E1616] flex justify-between rounded-lg p-4"
          >
            <h1 className="font-bold lg:text-2xl">
              {product.title}
            </h1>
            <p className="lg:text-2xl">${product.price}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={prev}
          disabled={page === 0}
          className="px-4 py-2 bg-[#8E1616] text-white rounded"
        >
          Prev
        </button>

        <button
          onClick={next}
          disabled={(page + 1) * limit >= data.total}
          className="px-4 py-2 bg-[#8E1616] text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
