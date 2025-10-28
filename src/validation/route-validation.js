import * as yup from "yup";

export const createRouteSchema = yup.object({
  name: yup.string().required("Name is required."),
  description: yup.string().optional(),
  pickup_type: yup
    .mixed()
    .oneOf(["FIXED", "FLEXIBLE"])
    .required("Pickup type is required."),
  start_latitude: yup.number().required("Start latitude is required."),
  start_longitude: yup.number().required("Start longitude is required."),
  end_latitude: yup.number().required("End latitude is required."),
  end_longitude: yup.number().required("End longitude is required."),
  base_price: yup
    .number()
    .positive("Base price must be positive.")
    .required("Base price is required."),
  van_id: yup.number().required("van_id is required."),
});

export const updateRouteSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  pickup_type: yup.mixed().oneOf(["FIXED", "FLEXIBLE"]).optional(),
  start_latitude: yup.number().optional(),
  start_longitude: yup.number().optional(),
  end_latitude: yup.number().optional(),
  end_longitude: yup.number().optional(),
  base_price: yup.number().positive("Base price must be positive.").optional(),
  van_id: yup.number().optional(),
});
