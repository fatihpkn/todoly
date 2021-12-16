import { Grid } from "@mui/material";
import Logo from "components/logo";
import UserBar from "components/user-bar";
import * as React from "react";
import { useAppActions, useAppState } from "store";

interface IAppHeaderProps extends React.HtmlHTMLAttributes<HTMLElement> {}

const AppHeader: React.FunctionComponent<IAppHeaderProps> = (props) => {
  const { user } = useAppState((store) => store.Auth);
  const { logout } = useAppActions((store) => store.Auth);

  return (
    <header {...props} className='border-b border-indigo-500 bg-indigo-600 shadow-lg shadow-indigo-500/30 text-white py-3 px-5'>
      {/* <div>{user?.name}</div>
      <button onClick={() => logout()}>Çıkış</button> */}
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid>
          <Logo />
        </Grid>
        <Grid>
          <UserBar />
        </Grid>
      </Grid>
    </header>
  );
};

export default AppHeader;
