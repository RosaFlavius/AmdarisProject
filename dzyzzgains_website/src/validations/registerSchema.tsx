import * as yup from "yup";

export const registerSchema = yup.object().shape({
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
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),

  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dateOfBirth: yup
    .string()
    .required("Date of birth is required")
    .min(
      10,
      "Your date of birth must have exact 10 characters. Example 10.02.2001"
    )
    .max(
      10,
      "Your date of birth must have exact 10 characters. Example 10.02.2001"
    ),
  phone: yup
    .string()
    .required("Phone is required")
    .min(10, "Phone must have exact 10 number. Example 0757123657")
    .max(10, "Phone must have exact 10 number. Example 0757123657"),
  country: yup
    .string()
    .required("Country is required")
    .min(4, "Country name must be at least 4 characters")
    .max(20, "Country can't have more than 20 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City name must be at least 2 characters")
    .max(20, "City can't have more than 20 characters"),
  address: yup
    .string()
    .required("Address is required")
    .min(2, "Address name must be at least 2 characters")
    .max(40, "Address can't have more than 40 characters"),
});
