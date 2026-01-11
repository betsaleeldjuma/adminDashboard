import { useState } from "react";

export const usePagination = (initialLimit = 10) => {
  const [page, setPage] = useState(0);

  const next = () => setPage((p) => p + 1);
  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const reset = () => setPage(0);

  return {
    page,
    limit: initialLimit,
    next,
    prev,
    reset,
  };
};