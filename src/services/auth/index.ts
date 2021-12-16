import { API } from "API";
import { LoginRequestModel, LoginUserModel, RegisterRequestModel } from "models/auth";

export async function Login(params: LoginRequestModel) {
  return API.post<LoginUserModel>("login", params);
}

export async function Register(params: RegisterRequestModel) {
  return API.post<LoginUserModel>("register", params);
}
