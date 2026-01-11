import { usePaginatedQuery } from "../hooks/usePaginatedQuery"
import type { User } from "../types/user"
import { usePagination } from "../hooks/usePagination"
import { useState } from "react"

const Users = () => {
  const { page, limit, next, prev } = usePagination(10)
  const [search, setSearch] = useState("")

  const { data, isLoading, error } = usePaginatedQuery<User>({
    key: "users",
    endpoint: "/users",
    page,
    limit,
    q: search,
    sort: "name_asc",
  })

  if (isLoading) return <p>Loading users...</p>
  if (error) return <p>Error loading users</p>
  if (!data) return <p>No users found</p>

  return (
    <div className="p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">USERS</h1>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user..."
        className="border p-2 rounded"
      />

      {/* LIST */}
      {data.data.map((user) => (
        <div
          key={user.id}
          className="bg-[#8E1616] text-white p-5 w-[100%] rounded"
        >
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p className="opacity-70">{user.email}</p>
        </div>
      ))}

      {/* PAGINATION */}
      <div className="flex gap-4">
        <button onClick={prev} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={next} disabled={page * limit >= data.total}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Users
