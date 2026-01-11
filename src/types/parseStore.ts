export const parseSort = (sort?: string) => {
  if (!sort) return {};

  const [sortBy, order] = sort.split("_");

  return {
    sortBy,
    order: order === "desc" ? "desc" : "asc",
  };
};