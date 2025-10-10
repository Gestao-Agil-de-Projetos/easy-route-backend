import * as yup from "yup";

export const createVanSchema = yup.object({
  plate: yup.string().required("A placa é obrigatória."),
  model: yup.string().required("O modelo é obrigatório."),
  capacity: yup
    .number()
    .integer("A capacidade deve ser um número inteiro.")
    .positive("A capacidade deve ser um número positivo.")
    .required("A capacidade é obrigatória."),
});

export const updateVanSchema = yup.object({
  plate: yup.string().optional(),
  model: yup.string().optional(),
  capacity: yup
    .number()
    .integer("A capacidade deve ser um número inteiro.")
    .positive("A capacidade deve ser um número positivo.")
    .optional(),
});