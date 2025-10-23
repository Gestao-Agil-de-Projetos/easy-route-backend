import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  phone: yup.string().nullable(),
  cpf_cnpj: yup
    .string()
    .matches(/^\d{11}$|^\d{14}$/, "CPF ou CNPJ inválido")
    .required("CPF/CNPJ é obrigatório"),
  role: yup.mixed().oneOf(["PASSENGER", "OWNER", "ADMIN"]).default("PASSENGER"),
  cnh: yup
    .string()
    .nullable()
    .when("role", {
      is: "OWNER",
      then: (schema) =>
        schema
          .required("CNH é obrigatória para motoristas")
          .matches(/^[0-9]{11}$/, "CNH inválida (deve conter 11 números)"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});
