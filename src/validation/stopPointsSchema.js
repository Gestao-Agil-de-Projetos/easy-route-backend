import * as yup from 'yup';

export const stopPointsSchema = yup.object({
  name: yup.string().required('O nome do ponto é obrigatório.'),
  latitude: yup.number().required('Latitude é obrigatória.'),
  longitude: yup.number().required('Longitude é obrigatória.'),
  description: yup.string().nullable(),
  route_id: yup.number().required('É necessário associar o ponto a uma rota.'),
});
