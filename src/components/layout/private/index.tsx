import AppHeader from "components/header";
import * as React from "react";
import { Outlet } from "react-router-dom";

interface IPrivateLayoutProps {}

const PrivateLayout: React.FunctionComponent<IPrivateLayoutProps> = (props) => {
  return (
    <div {...props}>
      <AppHeader />
      <main className="py-4 mt-2 px-2 md:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
