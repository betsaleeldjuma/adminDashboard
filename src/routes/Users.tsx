import { usePaginatedQuery } from "../hooks/usePaginatedQuery"
import type { User } from "../types/user"
import { usePagination } from "../hooks/usePagination"
import { useState } from "react"
import ErrorState from "../components/ErrorState"
import EmptyState from "../components/EmptyState"
import Loading from "../components/Loading"
import { Link } from "react-router"
import { FaEdit } from "react-icons/fa"
import { IoIosAddCircleOutline } from "react-icons/io"

const Users = () => {
  const { page, limit, next, prev } = usePagination(10)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("name_asc")          // tri par défaut
  const [genderFilter, setGenderFilter] = useState("")  // filtre par défaut

  const { data, isLoading, error } = usePaginatedQuery<User, "/users">({
    key: "users",
    endpoint: "/users",
    page,
    limit,
    q: search,
    sort: "name_asc",
    filter: genderFilter, // optionnel
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loading />
      </div>
    )

  if (error || !data)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <ErrorState />
      </div>
    )

  if (data.data.length === 0)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <EmptyState />
      </div>
    )

  return (
    <div className="p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">USERS</h1>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user..."
        className="card border p-2 rounded mb-2"
      />

      {/* TRI & FILTRE */}
      <div className="flex flex-col gap-4 mb-4">
        {/* Tri */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name_asc">First Name Asc</option>
          <option value="name_desc">First Name Desc</option>
          <option value="age_asc">Age Asc</option>
          <option value="age_desc">Age Desc</option>
        </select>

        {/* Filtre */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <Link to='/users/new' className="w-[100%] p-3 rounded-xl bg-gradient-to-b from-zinc-800 to-black text-white font-medium shadow-lg hover:scale-[1.02] transition flex justify-center items-center gap-2">
          <IoIosAddCircleOutline size={20}/><p>New User</p></Link>
      </div>

      {/* LIST */}
      {data.data.map((user) => (
        <div
          key={user.id}
          className="card bg-[#8E1616] p-5 w-[100%] rounded flex flex-col lg:flex-row lg:justify-evenly lg:items-center gap-2"
        >
          <img
            src={user.image || "/avatar-placeholder.png"}
            onError={(e) => (e.currentTarget.src = "/avatar-placeholder.png")}
            loading="lazy"
            alt={`${user.firstName} ${user.lastName}`}
            width={100}
            height={60}
          />
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p className="opacity-70">{user.email}</p>
          <p className="opacity-70">Gender: {user.gender}</p>
          <Link to={`/users/${user.id}/edit`} className="p-4 rounded-xl bg-gradient-to-b from-zinc-800 to-black text-white font-medium shadow-lg hover:scale-[1.02] transition flex justify-center items-center gap-2">
            <FaEdit />
            <p>Edit</p>
          </Link>
        </div>
      ))}


      {/* PAGINATION */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={prev}
          disabled={page === 1}
          className="w-[100%] py-3 rounded-xl bg-gradient-to-b from-zinc-800 to-black text-white font-medium shadow-lg hover:scale-[1.02] transition"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={next}
          disabled={page * limit >= data.total}
          className="w-[100%] py-3 rounded-xl bg-gradient-to-b from-zinc-800 to-black text-white font-medium shadow-lg hover:scale-[1.02] transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Users