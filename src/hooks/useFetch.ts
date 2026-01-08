import apiClient from "../api/apiClient";

export interface Products {
  id: number;
  title: string;
  price: number;
}

interface ProductsResponse {
  products: Products[];
}

export const fetchUsers = async (): Promise<number> => {
  const res = await apiClient.get("/users");
  return res.data;
};

export const fetchOrders = async (): Promise<number> => {
  const res = await apiClient.get("/carts");
  return res.data;
};

export const fetchProducts = async (): Promise<Products[]> => {
  const res = await apiClient.get<ProductsResponse>("/products");
  return res.data.products;
};
