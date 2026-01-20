import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        data
      );
      return res.data;
    },
  });
};