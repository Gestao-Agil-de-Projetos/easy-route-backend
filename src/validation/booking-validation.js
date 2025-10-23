import * as yup from "yup";

export const createBookingSchema = yup.object({
  userId: yup
    .number()
    .typeError("userId deve ser um número")
    .integer("userId deve ser um número inteiro")
    .required("userId é obrigatório"),
  routeId: yup
    .number()
    .typeError("routeId deve ser um número")
    .integer("routeId deve ser um número inteiro")
    .required("routeId é obrigatório"),
  stopPointId: yup
    .number()
    .typeError("stopPointId deve ser um número")
    .integer("stopPointId deve ser um número inteiro")
    .optional(),
  date: yup
    .date()
    .typeError("date deve ser uma data válida (YYYY-MM-DD ou similar)")
    .required("date é obrigatório"),
  status: yup
    .string()
    .oneOf(
      ["PENDING", "CONFIRMED", "CANCELLED", "FINISHED"],
      "status deve ser um dos seguintes: PENDING, CONFIRMED, CANCELLED ou FINISHED"
    )
    .optional(),
});

export const updateBookingSchema = yup.object({
  userId: yup
    .number()
    .typeError("userId deve ser um número")
    .integer("userId deve ser um número inteiro")
    .optional(),
  routeId: yup
    .number()
    .typeError("routeId deve ser um número")
    .integer("routeId deve ser um número inteiro")
    .optional(),
  stopPointId: yup
    .number()
    .typeError("stopPointId deve ser um número")
    .integer("stopPointId deve ser um número inteiro")
    .optional(),
  date: yup
    .date()
    .typeError("date deve ser uma data válida (YYYY-MM-DD ou similar)")
    .optional(),
  status: yup
    .string()
    .oneOf(
      ["PENDING", "CONFIRMED", "CANCELLED", "FINISHED"],
      "status deve ser um dos seguintes: PENDING, CONFIRMED, CANCELLED ou FINISHED"
    )
    .optional(),
});
