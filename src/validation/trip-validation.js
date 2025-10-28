import * as yup from "yup";

export const createTripSchema = yup.object({
  start_time: yup.date().required("start_time is required."),
  estimated_end_time: yup.date().required("estimated_end_time is required."),
  total_seats: yup.number().integer().min(1, "total_seats must be at least 1"),
  available_seats: yup
    .number()
    .integer()
    .min(0, "available_seats cannot be negative"),
  price: yup.number().positive("price must be positive"),
  route_id: yup.number().required("route_id is required."),
});

export const updateTripSchema = yup.object({
  start_time: yup.date().optional(),
  estimated_end_time: yup.date().optional(),
  total_seats: yup
    .number()
    .integer()
    .min(1, "total_seats must be at least 1")
    .optional(),
  available_seats: yup
    .number()
    .integer()
    .min(0, "available_seats cannot be negative")
    .optional(),
  price: yup.number().positive("price must be positive").optional(),
  status: yup
    .mixed()
    .oneOf(["SCHEDULED", "ONGOING", "FINISHED", "CANCELLED"])
    .optional(),
  route_id: yup.number().optional(),
});
