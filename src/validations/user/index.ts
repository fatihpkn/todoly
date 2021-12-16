import * as Yup from "yup";

export const UserValidationScheme = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export const UserProfileValidationScheme = UserValidationScheme.concat(Yup.object({ name: Yup.string().required().min(2) }));
