import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .required("Password is required"),
  phone: yup.string().nullable(),
  cpf_cnpj: yup
    .string()
    .matches(/^\d{11}$|^\d{14}$/, "Invalid CPF or CNPJ")
    .required("CPF/CNPJ is required"),
  role: yup.mixed().oneOf(["PASSENGER", "OWNER", "ADMIN"]).default("PASSENGER"),
  cnh: yup
    .string()
    .nullable()
    .when("role", {
      is: "OWNER",
      then: (schema) =>
        schema
          .required("Driver license (CNH) is required for owners")
          .matches(/^[0-9]{11}$/, "Invalid CNH (must contain 11 digits)"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
