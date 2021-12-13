import * as React from "react";

interface IPrivateProps {}

const Private: React.FunctionComponent<IPrivateProps> = (props) => {
  return <div>Logged in</div>;
};

export default Private;
