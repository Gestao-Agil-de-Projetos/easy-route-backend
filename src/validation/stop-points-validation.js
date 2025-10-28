import * as yup from "yup";

export const createStopPointSchema = yup.object({
  sequence_order: yup
    .number()
    .typeError("sequence_order must be a number"),
  latitude: yup
    .number()
    .typeError("latitude must be a number")
    .required("latitude is required"),
  longitude: yup
    .number()
    .typeError("longitude must be a number")
    .required("longitude is required"),
  description: yup.string().optional(),
});

export const updateStopPointSchema = yup.object({
  sequence_order: yup
    .number()
    .typeError("sequence_order must be a number")
    .optional(),
  latitude: yup.number().typeError("latitude must be a number").optional(),
  longitude: yup.number().typeError("longitude must be a number").optional(),
  description: yup.string().optional(),
});
