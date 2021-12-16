import { Alert, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfileValidationScheme } from "validations/user";
import { RegisterRequestModel } from "models/auth";
import { sleep } from "utils";
import { Box } from "@mui/system";
import { Register } from "services/auth";
import { useAppActions, useAppState } from "store";

interface IRegisterRouteProps {}

const RegisterRoute: React.FunctionComponent<IRegisterRouteProps> = (props) => {
  const { control, watch, formState, handleSubmit, setError } = useForm<RegisterRequestModel>({ resolver: yupResolver(UserProfileValidationScheme), reValidateMode: "onChange", mode: "onSubmit" });

  const { login } = useAppActions((store) => store.Auth);

  const [serverError, setServerError] = React.useState<string>();

  const onRegisterFormSubmit: SubmitHandler<RegisterRequestModel> = async (form) => {
    try {
      setServerError(undefined);
      await sleep(300);
      const data = await Register(form);
      await login(data);
    } catch (error) {
      setServerError(error as string);
    }
  };

  const { email, name, password } = formState.errors;

  return (
    <form onSubmit={handleSubmit(onRegisterFormSubmit)}>
      <Grid gap={1} container maxWidth='420px' justifyContent={"center"}>
        <Grid item xs={12}>
          <Typography mb={2} typography={"h6"}>
            Kayıt ol
          </Typography>
        </Grid>
        <Grid item xs={12} gap={2} container>
          <Grid item xs={12}>
            <Controller control={control} name='name' render={(props) => <TextField helperText={name?.message} error={!!name} {...props.field} fullWidth autoComplete='off' label='İsim' placeholder='Ad & Soyad' />} />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='email'
              render={(props) => <TextField helperText={email?.message} error={!!email} {...props.field} fullWidth autoComplete='off' type={"email"} label='E-Mail' placeholder='ornek@abc.com' />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='password'
              render={(props) => <TextField helperText={password?.message} error={!!password} {...props.field} fullWidth autoComplete='off' type='password' label='Şifre' placeholder='********' />}
            />
          </Grid>
          <Grid>
            <Button type='submit' disabled={(formState.submitCount > 0 && !formState.isValid && !formState.isSubmitSuccessful) || formState.isSubmitting} variant='contained'>
              {formState.isSubmitting && (
                <Box mr={1}>
                  <CircularProgress size={"10px"} color='primary' />
                </Box>
              )}
              Kayıt ol
            </Button>
          </Grid>
        </Grid>

        {serverError && (
          <Grid mt={1} xs={12} item>
            <Alert severity='error'>{serverError}</Alert>
          </Grid>
        )}

        <Grid item mt={2} xs={12}>
          <Typography typography='subtitle1'>
            Hesabın var mı? <NavLink to={"/login"}>Giriş yap</NavLink>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterRoute;
