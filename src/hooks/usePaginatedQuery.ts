import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../types/pagination";
import { fetchPaginated } from "./fetchPaginated";

interface UsePaginatedQueryParams {
  key: string;
  endpoint: "/products" | "/users" | "/carts";
  page: number;
  limit: number;
  q?: string;
  sort?: string;
}

export const usePaginatedQuery = <T>({
  key,
  endpoint,
  page,
  limit,
  q,
  sort,
}: UsePaginatedQueryParams) => {
  return useQuery<PaginatedResponse<T>>({
    queryKey: [key, page, q, sort],
    queryFn: () =>
      fetchPaginated<T>({
        endpoint,
        page,
        limit,
        q,
        sort,
      }),
    placeholderData: keepPreviousData,
  });
};
