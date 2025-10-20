import { stopPointsController } from '../controllers/stopPointsController.js';

export default async function stopPointsRoutes(fastify) {
  // Criar StopPoint
  fastify.post('/stoppoints', {
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
      response: {
        200: {
          description: 'StopPoint criado com sucesso',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            sequence_order: { type: 'integer' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            description: { type: 'string' },
            route_id: { type: 'integer' },
          },
        },
      },
    },
  }, stopPointsController.create);

  //  Listar todos
  fastify.get('/stoppoints', {
    schema: {
      tags: ['StopPoints'],
      summary: 'Lista todos os pontos de parada',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              sequence_order: { type: 'integer' },
              latitude: { type: 'number' },
              longitude: { type: 'number' },
              description: { type: 'string' },
              route_id: { type: 'integer' },
            },
          },
        },
      },
    },
  }, stopPointsController.getAll);

  //  Buscar por ID
  fastify.get('/stoppoints/:id', {
    schema: {
      tags: ['StopPoints'],
      summary: 'Busca um ponto de parada pelo ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            sequence_order: { type: 'integer' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            description: { type: 'string' },
            route_id: { type: 'integer' },
          },
        },
      },
    },
  }, stopPointsController.getById);

  // Atualizar
  fastify.put('/stoppoints/:id', {
    schema: {
      tags: ['StopPoints'],
      summary: 'Atualiza um ponto de parada existente',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        },
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
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            sequence_order: { type: 'integer' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            description: { type: 'string' },
            route_id: { type: 'integer' },
          },
        },
      },
    },
  }, stopPointsController.update);

  //  Deletar
  fastify.delete('/stoppoints/:id', {
    schema: {
      tags: ['StopPoints'],
      summary: 'Deleta um ponto de parada pelo ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  }, stopPointsController.delete);
}
