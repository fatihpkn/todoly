import { Dayjs } from "dayjs";
import { Action, Computed, State, Thunk } from "easy-peasy";
import { LoginUserModel, UserModel } from "models/auth";
import { StoreRequestStatus } from "store/types";

interface LoginUserData extends LoginUserModel {
  login_at: Dayjs;
}

export interface AuthStoreModel {
  data?: State<LoginUserData>;
  token: string | null | undefined;
  tokenHeaderSet: boolean;
  valid: Computed<AuthStoreModel, boolean>;
  user?: State<UserModel>;
  setTokenHeaderSet: Action<AuthStoreModel, boolean>;
  setUser: Action<AuthStoreModel, any>;
  setRequest: Action<AuthStoreModel, StoreRequestStatus>;
  setError: Action<AuthStoreModel, string | unknown>;
  logoutSuccess: Action<AuthStoreModel>;
  logout: Thunk<AuthStoreModel>;
  loginSuccess: Action<AuthStoreModel, LoginUserModel>;
  request: StoreRequestStatus;
  error: string | null | undefined | unknown;
  login: Thunk<AuthStoreModel, LoginUserModel>;
}
