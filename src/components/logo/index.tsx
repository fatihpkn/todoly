import * as React from "react";

interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return <div className='rounded-md py-1 px-5 inline-flex italic tracking-widest pointer-events-none select-none text-2xl drop-shadow-2xl'>TODOL'Y</div>;
};

export default Logo;
