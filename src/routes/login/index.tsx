import { Button, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { useAppActions } from "store";

interface ILoginRouteProps {}

const LoginRoute: React.FunctionComponent<ILoginRouteProps> = (props) => {
  const { login } = useAppActions((store) => store.Auth);

  return (
    <Grid gap={1} container maxWidth='420px' justifyContent={"center"}>
      <Grid xs={12}>
        <Typography mb={2} typography={"h6"}>
          Giriş yap
        </Typography>
      </Grid>
      <Grid xs={12} gap={2} container>
        <Grid xs={12}>
          <TextField fullWidth autoComplete='nono' label='E-Mail' placeholder='ornek@abc.com' />
        </Grid>
        <Grid xs={12}>
          <TextField autoComplete='offsdas' type={"password"} fullWidth label='Şifre' placeholder='********' />
        </Grid>
        <Grid>
          <Button variant='contained'>Giriş</Button>
        </Grid>
      </Grid>

      <Grid mt={2} xs={12}>
        <Typography typography='subtitle1'>
          Hesabın yok mu? <NavLink to={"/register"}>Kayıt ol</NavLink>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginRoute;
