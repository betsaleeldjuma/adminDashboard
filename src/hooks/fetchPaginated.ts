import apiClient from "../api/apiClient";
import { parseSort } from "../types/parseStore";
import type { PaginatedResponse } from "../types/pagination";

interface FetchParams {
  endpoint: "/products" | "/users" | "/carts";
  page: number;
  limit: number;
  q?: string;
  sort?: string;
}

export const fetchPaginated = async <T>({
  endpoint,
  page,
  limit,
  q,
  sort,
}: FetchParams): Promise<PaginatedResponse<T>> => {
  const skip = page * limit;
  const { sortBy, order } = parseSort(sort);

  const isSearch = Boolean(q);
  const url =
    isSearch && endpoint !== "/carts"
      ? `${endpoint}/search`
      : endpoint;

  const res = await apiClient.get(url, {
    params: {
      q,
      limit,
      skip,
      sortBy,
      order,
    },
  });

  const key =
    endpoint === "/users"
      ? "users"
      : endpoint === "/carts"
      ? "carts"
      : "products";

  return {
    data: res.data[key],
    total: res.data.total,
    skip: res.data.skip,
    limit: res.data.limit,
  };
};
