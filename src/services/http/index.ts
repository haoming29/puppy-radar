import { LoginUserData } from "@/types/api/user";
import { LOGIN_USER } from "./api";
import http from "./axios";

export const loginUser = (data: LoginUserData) => {
  return http.post(LOGIN_USER, data);
};
