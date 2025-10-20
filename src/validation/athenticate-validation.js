import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres").required(),
  phone: yup.string().nullable(),
  cpf_cnpj: yup
    .string()
    .matches(/^\d{11}$|^\d{14}$/, "CPF ou CNPJ inválido")
    .required("CPF/CNPJ é obrigatório"),
  role: yup.mixed().oneOf(["PASSENGER", "OWNER", "ADMIN"]).default("PASSENGER"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});
