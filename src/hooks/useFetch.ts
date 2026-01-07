import apiClient from "../api/apiClient";

export const fetchUsers = async (): Promise<number> => {
  const res = await apiClient.get("/users");
  return res.data;
};

export const fetchOrders = async (): Promise<number> => {
  const res = await apiClient.get("/carts");
  return res.data;
};

export const fetchProducts = async (): Promise<number> => {
  const res = await apiClient.get("/products");
  return res.data.products;
};
