import { createStore, createTypedHooks, EasyPeasyConfig } from "easy-peasy";

// Stores Models
import { AppStoreModel } from "./app/models";
import { AuthStoreModel } from "./auth/models";

// Stores
import App from "./app";
import Auth from "./auth";

// Global Store Model
interface StoreModel {
  App: AppStoreModel;
  Auth: AuthStoreModel;
}

// We need use hooks with typescript
const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<StoreModel>();

// We will use that functions for update / connect to store. (Not easy-peasy itself hooks.)
export { useStoreActions as useAppActions, useStoreState as useAppState, useStoreDispatch as useAppDispatch, useStore as useAppStore };

export const StoreCombine: StoreModel = {
  App: App,
  Auth: Auth,
};

export const StoreConfig: EasyPeasyConfig = {
  name: "todoly-store",
  devTools: import.meta.env.DEV,
};

export const Store = createStore(StoreCombine, StoreConfig);
