import { applyApiRequestMiddleware } from "API";
import dayjs from "dayjs";
import { useStoreRehydrated } from "easy-peasy";
import { useApiAuthCatch } from "hooks/useApiAuthCatch";
import * as React from "react";
import { useQueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { useAppState, useAppActions } from "store";

const Private = React.lazy(
  async () =>
    new Promise((resolve) => {
      // Simulate loading components for what will you see when internet connection goes bad.
      const r = import("containers/private");
      setTimeout(() => {
        //@ts-ignore
        return resolve(r);
      }, parseInt(import.meta.env.TODOLY_APP_FAKE_LOADING_TIME));
    })
);
const Public = React.lazy(
  async () =>
    new Promise((resolve) => {
      // Simulate loading components for what will you see when internet connection goes bad.
      const r = import("containers/public");
      setTimeout(() => {
        //@ts-ignore
        return resolve(r);
      }, parseInt(import.meta.env.TODOLY_APP_FAKE_LOADING_TIME));
    })
);

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const { valid, user } = useApiAuthCatch(applyApiRequestMiddleware);

  const client = useQueryClient();

  React.useEffect(() => {
    if (!valid) {
      client.clear();
    }
    console.log("valid", valid);
  }, [valid]);

  return <BrowserRouter>{valid ? <Private /> : <Public />}</BrowserRouter>;
};

export default App;
