import axios, { AxiosRequestConfig } from "axios";

function CreateAPI(config: AxiosRequestConfig) {
  const instance = axios.create(config);
  return instance;
}

export const API = CreateAPI({ baseURL: import.meta.env.TODOLY_API_ENDPOINT });
