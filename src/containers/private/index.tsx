import * as React from "react";

interface IPrivateProps {}

const Private: React.FunctionComponent<IPrivateProps> = (props) => {
  return <div>Logged in, go on..</div>;
};

export default Private;
