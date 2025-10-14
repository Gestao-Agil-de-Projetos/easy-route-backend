import { optimizeRouteController } from '../controllers/optimizeRouteController.js';
import { checkOwner } from '../middlewares/auth.js';

export async function optimizeRouteRoutes(app) {
  app.post('/routes/:routeId/optimize', {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      description: 'Otimizar a rota com base nas paradas e distâncias',
      tags: ['Optimize-Route'],
      params: {
        type: 'object',
        properties: { routeId: { type: 'number' } },
      },
      response: {
        200: {
          description: 'Rota otimizada retornada com sucesso',
          solutionId: { type: 'string' },
        },
      },
    },
    handler: optimizeRouteController.optimize,
  });
}
