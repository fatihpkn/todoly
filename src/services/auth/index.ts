import { API } from "API";

export async function Login(params: any) {
  return API.post("login", params);
}
