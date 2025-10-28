import * as yup from "yup";
import { createStopPointSchema } from "./stop-points-validation.js";

export const createBookingSchema = yup.object({
  userId: yup
    .number()
    .typeError("userId must be a number")
    .integer("userId must be an integer"),

  tripId: yup
    .number()
    .typeError("tripId must be a number")
    .integer("tripId must be an integer")
    .required("tripId is required"),

  stopPointId: yup
    .number()
    .typeError("stopPointId must be a number")
    .integer("stopPointId must be an integer")
    .optional(),

  stopPoint: createStopPointSchema.optional(),

  status: yup
    .string()
    .oneOf(
      ["PENDING", "CONFIRMED", "CANCELLED", "FINISHED"],
      "status must be one of the following: PENDING, CONFIRMED, CANCELLED, or FINISHED"
    )
    .optional(),
});

export const updateBookingSchema = yup.object({
  userId: yup
    .number()
    .typeError("userId must be a number")
    .integer("userId must be an integer")
    .optional(),

  tripId: yup
    .number()
    .typeError("tripId must be a number")
    .integer("tripId must be an integer")
    .optional(),

  stopPointId: yup
    .number()
    .typeError("stopPointId must be a number")
    .integer("stopPointId must be an integer")
    .optional(),

  stopPoint: createStopPointSchema.optional(),

  status: yup
    .string()
    .oneOf(
      ["PENDING", "CONFIRMED", "CANCELLED", "FINISHED"],
      "status must be one of the following: PENDING, CONFIRMED, CANCELLED, or FINISHED"
    )
    .optional(),
});
