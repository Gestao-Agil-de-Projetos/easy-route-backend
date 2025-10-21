
import * as yup from 'yup';

export const stopPointSchema = yup.object({
  sequence_order: yup
    .number()
    .typeError('sequence_order deve ser um número')
    .required('sequence_order é obrigatório'),
  latitude: yup
    .number()
    .typeError('latitude deve ser um número')
    .required('latitude é obrigatório'),
  longitude: yup
    .number()
    .typeError('longitude deve ser um número')
    .required('longitude é obrigatório'),
  description: yup.string().optional(),
  route_id: yup
    .number()
    .typeError('route_id deve ser um número')
    .required('route_id é obrigatório'),
});

export async function stopPointsValidation(request, reply) {
  try {
    await stopPointSchema.validate(request.body, { abortEarly: false, stripUnknown: true });
    return;
  } catch (err) {
    const errors = (err.inner || []).map(e => ({ path: e.path, message: e.message }));

    return reply.status(422).send({ errors });
  }
}
