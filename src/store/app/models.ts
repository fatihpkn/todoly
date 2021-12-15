import { Action, State } from "easy-peasy";

export interface AppStoreModel<T = AppVariables> {
  variables: T;
  notifications: State<object[]>;
  appVariableSet: Action<AppStoreModel<AppVariables>, AppVariables>;
}

export interface AppVariables {
  loading?: boolean | string;
  theme?: "dark" | "light";
  sidebarOpen?: boolean;
  currentPath?: string;
}
