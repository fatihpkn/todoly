import Logo from "components/logo";
import * as React from "react";
import { Outlet } from "react-router-dom";

interface IPublicLayoutProps {}

const PublicLayout: React.FunctionComponent<IPublicLayoutProps> = (props) => {
  return (
    <div className="flex flex-col h-full">
      <div className='text-gray-700 text-xl text-center my-5'>
        <Logo />
      </div>
      <main className='flex items-center justify-center flex-grow w-full'>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
