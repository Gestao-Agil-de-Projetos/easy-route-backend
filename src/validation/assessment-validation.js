import * as yup from "yup";

export const assessmentSchema = yup.object({
  trip_id: yup
    .number()
    .typeError("trip_id must be a number")
    .integer("trip_id must be an integer")
    .positive("trip_id must be positive")
    .required("trip_id is required"),

  booking_id: yup
    .number()
    .typeError("booking_id must be a number")
    .integer("booking_id must be an integer")
    .positive("booking_id must be positive")
    .required("booking_id is required"),

  rating: yup
    .number()
    .typeError("rating must be a number")
    .min(1, "rating must be between 1 and 5")
    .max(5, "rating must be between 1 and 5")
    .required("rating is required"),

  feedback: yup
    .string()
    .trim()
    .min(3, "feedback must have at least 3 characters")
    .max(500, "feedback cannot exceed 500 characters")
    .required("feedback is required"),
});
