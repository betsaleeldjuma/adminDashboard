import apiClient from "./apiClient";

export const fetchUsersCount = async (): Promise<number> => {
  const res = await apiClient.get("/users");
  return res.data.total;
};

export const fetchOrdersCount = async (): Promise<number> => {
  const res = await apiClient.get("/carts");
  return res.data.total;
};

export const fetchProductsCount = async (): Promise<number> => {
  const res = await apiClient.get("/products");
  return res.data.total;
};
