import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email. Example user@domain.com")
    .min(5, "Email must have at least 5 characters")
    .max(30, "Email can't have more than 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must have at least 5 characters")
    .max(30, "Password can't have more than 30 characters"),
});
