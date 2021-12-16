import axios, { AxiosRequestConfig } from "axios";
import { sleep } from "utils";
import { GlobalErrorHandler, GlobalRequestHandler, GlobalResponseHandler } from "./helpers";

function CreateAPI(config: AxiosRequestConfig) {
  const instance = axios.create(config);

  let middlewares: Function[] = [];

  const applyApiRequestMiddleware = async (fn?: (req: AxiosRequestConfig) => Promise<any>): Promise<{ clear: () => void }> => {
    if (!fn) return { clear: () => {} };

    const middlewaresLength = middlewares.push(fn);

    return {
      clear: () => {
        middlewares.splice(middlewaresLength - 1, 1);
      },
    };
  };

  const GetMiddlewares = () => middlewares;

  instance.interceptors.request.use((req) => GlobalRequestHandler(req, GetMiddlewares));
  instance.interceptors.response.use(GlobalResponseHandler, GlobalErrorHandler);

  return { instance, applyApiRequestMiddleware };
}

export const { instance: API, applyApiRequestMiddleware } = CreateAPI({ baseURL: import.meta.env.TODOLY_API_ENDPOINT });

// maybe we could have some other API ? Maybe v2
export const { instance: API_V2, applyApiRequestMiddleware: API_v2_applyMiddleware } = CreateAPI({ baseURL: `${import.meta.env.TODOLY_API_ENDPOINT}v2/` });

const logMiddleware = await applyApiRequestMiddleware((req: AxiosRequestConfig) => {
  return new Promise(async (resolve, reject) => {
    console.log("Log something before request go..");
    await sleep(100);
    resolve(req);
  });
});

// We can clear middleware
// setTimeout(() => {
//   logMiddleware.clear()
// }, 1000);

const slowDownAPI = (req: AxiosRequestConfig | Promise<AxiosRequestConfig>) =>
  new Promise(async (resolve, reject) => {
    console.log("api goes slow down...");
    await sleep(2500);
    resolve(req);
  });

// Slow down API request with middleware
// applyApiRequestMiddleware(slowDownAPI);
