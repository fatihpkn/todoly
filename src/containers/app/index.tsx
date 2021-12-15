import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppState } from "store";

const Private = React.lazy(
  async () =>
    new Promise((resolve) => {
      // Simulate loading components for what will you see when internet connection goes bad.
      const r = import("containers/private");
      setTimeout(() => {
        //@ts-ignore
        return resolve(r);
      }, import.meta.env.TODOLY_APP_FAKE_LOADING_TIME);
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
      }, import.meta.env.TODOLY_APP_FAKE_LOADING_TIME);
    })
);

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const { valid } = useAppState((store) => store.Auth);

  console.log("user", valid);

  return <BrowserRouter>{valid ? <Private /> : <Public />}</BrowserRouter>;
};

export default App;
