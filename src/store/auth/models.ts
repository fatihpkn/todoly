import { Action, Computed, State, Thunk } from "easy-peasy";
import { StoreRequestStatus } from "store/types";

export interface AuthStoreModel {
  data?: State<any>;
  token: string | null | undefined;
  tokenHeaderSet: boolean;
  valid: Computed<AuthStoreModel, boolean>;
  user?: State<any>;
  setTokenHeaderSet: Action<AuthStoreModel, boolean>;
  setUser: Action<AuthStoreModel, any>;
  setRequest: Action<AuthStoreModel, StoreRequestStatus>;
  setError: Action<AuthStoreModel, string | unknown>;
  logoutSuccess: Action<AuthStoreModel>;
  logout: Thunk<AuthStoreModel>;
  loginSuccess: Action<AuthStoreModel, any>;
  request: StoreRequestStatus;
  error: string | null | undefined | unknown;
  login: Thunk<AuthStoreModel, { email: string; passowrd: string }>;
}
