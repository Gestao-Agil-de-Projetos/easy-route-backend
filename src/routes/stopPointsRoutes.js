import { stopPointsController } from '../controllers/stopPointsController.js';
import { stopPointsValidation } from '../validation/stop-points-validation.js';
import { checkOwner } from '../middlewares/auth.js';

export default async function stopPointsRoutes(app) {
  app.post('/stoppoints', {
    preHandler: [app.authenticate, checkOwner, stopPointsValidation],
    schema: {
      tags: ['StopPoints'],
      summary: 'Cria um novo ponto de parada',
      body: {
        type: 'object',
        required: ['sequence_order', 'latitude', 'longitude', 'route_id'],
        properties: {
          sequence_order: { type: 'integer' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
          description: { type: 'string' },
          route_id: { type: 'integer' },
        },
      },
    },
  }, stopPointsController.create);

  app.get('/stoppoints', {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      tags: ['StopPoints'],
      summary: 'Lista todos os pontos de parada',
    },
  }, stopPointsController.getAll);

  app.get('/stoppoints/:id', {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      tags: ['StopPoints'],
      summary: 'Busca um ponto de parada pelo ID',
      params: { 
        type: 'object', 
        properties: { id: { type: 'integer' } } 
      },
    },
  }, stopPointsController.getById);

  app.put('/stoppoints/:id', {
    preHandler: [app.authenticate, checkOwner, stopPointsValidation],
    schema: {
      tags: ['StopPoints'],
      summary: 'Atualiza um ponto de parada existente',
      params: { 
        type: 'object', 
        properties: { id: { type: 'integer' } } 
      },
      body: {
        type: 'object',
        properties: {
          sequence_order: { type: 'integer' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
          description: { type: 'string' },
          route_id: { type: 'integer' },
        },
      },
    },
  }, stopPointsController.update);

  app.delete('/stoppoints/:id', {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      tags: ['StopPoints'],
      summary: 'Deleta um ponto de parada pelo ID',
      params: { 
        type: 'object', 
        properties: { id: { type: 'integer' } } 
      },
    },
  }, stopPointsController.delete);
}
