import * as React from "react";

interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return <div className='rounded-md border py-2 px-5 inline-flex'>TODOLY</div>;
};

export default Logo;
