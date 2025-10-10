import * as yup from 'yup';

export const createRouteSchema = yup.object({
  name: yup.string().required('Nome é obrigatório.'),
  description: yup.string().optional(),
  pickup_type: yup.mixed().oneOf(['FIXED','FLEXIBLE']).required('Tipo de pickup é obrigatório.'),
  start_latitude: yup.number().required('Latitude de início é obrigatória.'),
  start_longitude: yup.number().required('Longitude de início é obrigatória.'),
  end_latitude: yup.number().required('Latitude de fim é obrigatória.'),
  end_longitude: yup.number().required('Longitude de fim é obrigatória.'),
  base_price: yup.number().positive('O preço base deve ser positivo.').required('Preço base é obrigatório.'),
  van_id: yup.number().required('van_id é obrigatório.'),
});

export const updateRouteSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  pickup_type: yup.mixed().oneOf(['FIXED','FLEXIBLE']).optional(),
  start_latitude: yup.number().optional(),
  start_longitude: yup.number().optional(),
  end_latitude: yup.number().optional(),
  end_longitude: yup.number().optional(),
  base_price: yup.number().positive('O preço base deve ser positivo.').optional(),
  van_id: yup.number().optional(),
});
