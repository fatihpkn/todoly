import * as React from "react";
import { useAppActions, useAppState } from "store";

interface IProfileRouteProps {}

const ProfileRoute: React.FunctionComponent<IProfileRouteProps> = (props) => {
  const { user } = useAppState((s) => s.Auth);

  return <pre>{JSON.stringify(user, null, 3)}</pre>;
};

export default ProfileRoute;
