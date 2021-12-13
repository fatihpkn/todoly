import * as React from "react";

const Private = React.lazy(
  async () =>
    new Promise((resolve) => {
      // Simulate loading components for what will you see when internet connection goes bad.
      const r = import("containers/private");
      setTimeout(() => {
        //@ts-ignore
        return resolve(r);
      }, 1000);
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
      }, 1000);
    })
);

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const user = true;

  return <div>{user ? <Private /> : <Public />}</div>;
};

export default App;
