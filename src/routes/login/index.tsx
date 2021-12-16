import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, CircularProgress, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LoginRequestModel } from "models/auth";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Login } from "services/auth";
import { useAppActions } from "store";
import { sleep } from "utils";
import { UserValidationScheme } from "validations/user";

interface ILoginRouteProps {}

const LoginRoute: React.FunctionComponent<ILoginRouteProps> = (props) => {
  const { control, handleSubmit, setError, formState } = useForm<LoginRequestModel>({ resolver: yupResolver(UserValidationScheme), reValidateMode: "onChange" });

  const [serverErrorMessage, setServerErrorMessage] = React.useState<string | null>(null);

  const { login } = useAppActions((store) => store.Auth);

  const handleLoginFormSubmit: SubmitHandler<LoginRequestModel> = async (form) => {
    setServerErrorMessage(null);

    try {
      await sleep(650);
      const data = await Login(form);
      await login(data);
    } catch (error) {
      console.error("Errro on Login -> ", error);
      setServerErrorMessage(error as string);
      setError("email", { type: "validate" });
      setError("password", { type: "validate" });
    }
  };

  return (
    <Grid gap={1} container maxWidth='420px' justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography mb={2} typography={"h6"}>
          Giriş yap
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <Grid item xs={12} gap={2} container>
          <Grid item xs={12}>
            <Controller control={control} name='email' render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} fullWidth label='E-Mail' placeholder='ornek@abc.com' />} />
          </Grid>
          <Grid item xs={12}>
            <Controller control={control} name='password' render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} type='password' fullWidth label='Şifre' placeholder='********' />} />
          </Grid>
          <Grid>
            <Button type='submit' disabled={(formState.submitCount > 0 && !formState.isValid && !formState.isSubmitSuccessful) || formState.isSubmitting} variant='contained'>
              {formState.isSubmitting && (
                <Box mr={1}>
                  <CircularProgress size={"10px"} color='primary' />
                </Box>
              )}
              Giriş
            </Button>
          </Grid>
        </Grid>
      </form>

      {serverErrorMessage && (
        <Grid mt={1} xs={12} item>
          <Alert severity='error'>{serverErrorMessage}</Alert>
        </Grid>
      )}

      <Grid mt={2} xs={12} item>
        <Typography typography='subtitle1'>
          Hesabın yok mu? <NavLink to={"/register"}>Kayıt ol</NavLink>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginRoute;
