import * as yup from 'yup';

export const createTripSchema = yup.object({
  start_time: yup.date().required('start_time é obrigatório.'),
  estimated_end_time: yup.date().required('estimated_end_time é obrigatório.'),
  total_seats: yup.number().integer().min(1).required('total_seats é obrigatório.'),
  available_seats: yup.number().integer().min(0).required('available_seats é obrigatório.'),
  price: yup.number().positive().required('price é obrigatório.'),
  route_id: yup.number().required('route_id é obrigatório.'),
});

export const updateTripSchema = yup.object({
  start_time: yup.date().optional(),
  estimated_end_time: yup.date().optional(),
  total_seats: yup.number().integer().min(1).optional(),
  available_seats: yup.number().integer().min(0).optional(),
  price: yup.number().positive().optional(),
  status: yup.mixed().oneOf(['SCHEDULED','ONGOING','FINISHED','CANCELLED']).optional(),
  route_id: yup.number().optional(),
});
