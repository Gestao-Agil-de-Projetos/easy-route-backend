// src/validation/booking-validation.js
import * as yup from 'yup';

export const bookingSchema = yup.object({
  userId: yup.number().integer().required('userId é obrigatório'),
  routeId: yup.number().integer().required('routeId é obrigatório'),
  stopPointId: yup.number().integer().optional(),
  date: yup.date().required('date é obrigatório'),
  status: yup.string().oneOf(['pending','confirmed','cancelled']).optional(),
});

export async function bookingValidation(request, reply) {
  try {
    await bookingSchema.validate(request.body, { abortEarly: false, stripUnknown: true });
    return;
  } catch (err) {
    const errors = (err.inner || []).map(e => ({ path: e.path, message: e.message }));
    return reply.status(422).send({ errors });
  }
}
