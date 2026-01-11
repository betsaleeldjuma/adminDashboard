import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../types/pagination";
import { fetchPaginated } from "./fetchPaginated";
import type { FetchParams } from "./fetchPaginated";

type Endpoints = "/products" | "/users" | "/carts";

interface UsePaginatedQueryParams<E extends Endpoints> {
  key: string;
  endpoint: E;
  page: number;
  limit: number;
  q?: string;
  sort?: string;
  filter?: string;
}

/**
 * Extension du type FetchParams pour inclure filter
 */
type FetchParamsWithFilter = FetchParams & {
  filter?: string;
};

export const usePaginatedQuery = <T, E extends Endpoints>({
  key,
  endpoint,
  page,
  limit,
  q,
  sort,
  filter,
}: UsePaginatedQueryParams<E>) => {
  return useQuery<PaginatedResponse<T>>({
    queryKey: [key, page, q, sort, filter],
    queryFn: () =>
      fetchPaginated<T>({
        endpoint,
        page,
        limit,
        q,
        sort,
        filter,
      } satisfies FetchParamsWithFilter),
    placeholderData: keepPreviousData,
  });
};
