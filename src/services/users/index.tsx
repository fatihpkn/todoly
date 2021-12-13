import { API } from "API";
import { UserModel } from "models/auth";

export async function GetUsers() {
  return API.get<UserModel[]>("users");
}
