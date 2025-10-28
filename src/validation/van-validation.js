import * as yup from "yup";

export const createVanSchema = yup.object({
  plate: yup.string().required("Plate is required."),
  model: yup.string().required("Model is required."),
  capacity: yup
    .number()
    .integer("Capacity must be an integer.")
    .positive("Capacity must be a positive number.")
    .required("Capacity is required."),
});

export const updateVanSchema = yup.object({
  plate: yup.string().optional(),
  model: yup.string().optional(),
  capacity: yup
    .number()
    .integer("Capacity must be an integer.")
    .positive("Capacity must be a positive number.")
    .optional(),
});
