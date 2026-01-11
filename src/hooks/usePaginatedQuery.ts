import { useQuery } from "@tanstack/react-query";
import { fetchPaginated } from "./fetchPaginated";

export const usePaginatedQuery = <T>({
  key,
  endpoint,
  page,
  limit,
  q,
  sort,
}: {
  key: string;
  endpoint: "/products" | "/users" | "/carts";
  page: number;
  limit: number;
  q?: string;
  sort?: string;
}) => {
  return useQuery({
    queryKey: [key, page, q, sort],
    queryFn: () =>
      fetchPaginated<T>({
        endpoint,
        page,
        limit,
        q,
        sort,
      }),
    placeholderData: true,
  });
};
