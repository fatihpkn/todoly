import * as React from "react";
import { Outlet } from "react-router-dom";

interface IPrivateLayoutProps {}

const PrivateLayout: React.FunctionComponent<IPrivateLayoutProps> = (props) => {
  return (
    <div {...props}>
      <header className='bg-indigo-500'>Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
