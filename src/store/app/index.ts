import { action, Action, persist, State } from "easy-peasy";
import { AppStoreModel, AppVariables } from "./models";

const App: AppStoreModel<AppVariables> = persist(
  {
    variables: {
      loading: true,
      sidebarOpen: false,
      currentPath: undefined,
    },

    appVariableSet: action((state, payload) => {
      state.variables = {
        ...state.variables,
        ...payload,
      };
    }),
    notifications: [],
  },
  { deny: [] }
);

export default App;
