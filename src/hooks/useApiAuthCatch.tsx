import { applyApiRequestMiddleware } from "API";
import { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import { useStoreRehydrated } from "easy-peasy";
import React from "react";
import { useAppActions, useAppState } from "store";

export const useApiAuthCatch = (
  applyMiddlwareFn: (fn?: (req: AxiosRequestConfig<any>) => Promise<any>) => Promise<{
    clear: () => void;
  }>
) => {
  const { valid, token, data, user } = useAppState((store) => store.Auth);
  const { logout } = useAppActions((store) => store.Auth);

  const ref = React.useRef<
    Promise<{
      clear: () => void;
    }>
  >();

  const rhydrated = useStoreRehydrated();

  const TOKEN_EXPIRE_MILISECONDS = parseInt(import.meta.env.TODOLY_API_TOKEN_EXPIRE_MILISECONDS);

  const catcher = (req: AxiosRequestConfig) =>
    new Promise(async (resolve, reject) => {
      const loginDiff = dayjs().diff(dayjs(data?.login_at), "milliseconds");
      const isTokenExpire = loginDiff >= TOKEN_EXPIRE_MILISECONDS;

      if (isTokenExpire || !token || !valid) {
        // maybe we can get a new token to set header ?
        //@ts-ignore
        req.headers["Authorization"] = undefined;
        await logout();
        return reject("Your session expire, please login again.");
      }

      if (req.data) {
        // json-server-auth need user id for permission
        req.data = {
          ...req.data,
          userId: user?.id,
        };
      }

      // Every get function we should set userId for json-auth-server
      // otherwise it will not understand who we are with Bearer token
      // we could delete this logic a real world application
      if (req.method === "get" || req.method === "GET") {
        req.params = {
          ...req.params,
          userId: user?.id,
        };
      }

      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      };

      resolve(req);
    });

  React.useEffect(() => {
    if (!rhydrated) return;
    if (!ref.current && valid) {
      const middleware = applyMiddlwareFn((req) => catcher(req));
      ref.current = middleware;
      return;
    }

    if (!valid && ref.current) {
      ref.current.then((r) => {
        r.clear();
        ref.current = undefined;
      });
    }

    return () => {
      ref.current && ref.current.then((r) => r.clear());
    };
  }, [token, rhydrated, valid]);

  return { valid, user };
};
