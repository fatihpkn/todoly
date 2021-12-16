import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export const GlobalRequestHandler = async (request: AxiosRequestConfig | Promise<AxiosRequestConfig>, getMiddlewares: () => Function[]): Promise<AxiosRequestConfig> => {
  const middlewares = getMiddlewares();
  for await (const middleware of middlewares) {
    await middleware(request);
  }
  return request;
};

export const GlobalResponseHandler = (response: AxiosResponse) => {
  return response.data;
};

export const GlobalErrorHandler = async (responseError: AxiosError<string>) => {
  console.error("Global API error handler->", responseError.response?.data);
  console.error("Global API error handler->", responseError.response?.config.url);

  let err = null;

  console.log("responseError", responseError.toJSON());

  console.log("Error ->", responseError.response?.status);

  const status = responseError.response?.status;

  // if (responseError.response?.status === 500) {
  //   throw responseError.response?.data;
  // }

  if (status === 401) {
    localStorage.clear();
    window.location.href = "/";
  }

  if (responseError.response && responseError.response.data) {
    const { data, config } = responseError.response;

    if (data) {
      err = data;
    }

    throw err;
  }

  err = responseError.response && responseError.response.data || "Server not responding";

  throw err;
};
