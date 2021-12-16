import dayjs from "dayjs";
import { action, computed, persist, thunk } from "easy-peasy";
import { Login } from "services/auth";
import { StoreRequestStatus } from "store/types";
import { sleep } from "utils";
import { AuthStoreModel } from "./models";

const Auth: AuthStoreModel = persist(
  {
    data: undefined,
    token: null,
    tokenHeaderSet: false,
    valid: computed((state) => !!state.data?.accessToken),
    user: undefined,
    request: StoreRequestStatus.IDLE,
    error: null,
    setTokenHeaderSet: action((state, payload) => {
      state.tokenHeaderSet = payload;
    }),
    setRequest: action((state, payload) => {
      state.request = payload;
    }),
    setError: action((state, payload) => {
      state.error = payload;
      state.request = StoreRequestStatus.ERROR;
      throw payload;
    }),

    /**
     * Login actions
     */
    login: thunk(async (actions, payload, helpers) => {
      actions.setRequest(StoreRequestStatus.PENDING);

      try {
        actions.loginSuccess(payload);
        actions.setTokenHeaderSet(true);
        actions.setRequest(StoreRequestStatus.SUCCESS);
      } catch (error) {
        console.error("Error while login -> ", error);
        actions.setError(error);
      }
      actions.setRequest(StoreRequestStatus.IDLE);
    }),
    loginSuccess: action((state, payload) => {
      state.data = { ...payload, login_at: dayjs() };
      state.token = payload.accessToken;
      state.user = payload.user;
    }),

    setUser: action((state, payload) => {
      state.user = payload;
    }),

    /**
     * Logout actions
     */
    logout: thunk(async (actions, payload) => {
      actions.logoutSuccess();
    }),
    logoutSuccess: action((state, payload) => {
      state.data = undefined;
      state.token = null;
      state.tokenHeaderSet = false;
      state.user = undefined;
      localStorage.removeItem("[todoly-store][0][Auth]");
    }),
  },
  {
    allow: ["token", "user", "data"],
    deny: ["valid"],
    storage: "localStorage",
  }
);

export default Auth;
