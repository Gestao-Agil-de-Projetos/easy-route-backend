import * as yup from "yup";

export const createStopPointSchema = yup.object({
  sequence_order: yup
    .number()
    .typeError("sequence_order deve ser um número")
    .required("sequence_order é obrigatório"),
  latitude: yup
    .number()
    .typeError("latitude deve ser um número")
    .required("latitude é obrigatório"),
  longitude: yup
    .number()
    .typeError("longitude deve ser um número")
    .required("longitude é obrigatório"),
  description: yup.string().optional(),
  route_id: yup
    .number()
    .typeError("route_id deve ser um número")
    .required("route_id é obrigatório"),
});

export const updateStopPointSchema = yup.object({
  sequence_order: yup
    .number()
    .typeError("sequence_order deve ser um número")
    .optional(),
  latitude: yup.number().typeError("latitude deve ser um número").optional(),
  longitude: yup.number().typeError("longitude deve ser um número").optional(),
  description: yup.string().optional(),
  route_id: yup.number().typeError("route_id deve ser um número").optional(),
});
