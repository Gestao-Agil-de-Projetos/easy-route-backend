import axios from "axios";

export default {
  async GraphHopperRouteOptimize(payload) {
    const GH_BASE =
      process.env.GRAPHHOPPER_URL || "https://graphhopper.com/api/1/vrp/optimize";
    const GH_KEY = process.env.GRAPHHOPPER_KEY;

    try {
      const url = `${GH_BASE}?key=${GH_KEY}`;
      const ghResp = await axios.post(url, payload, { timeout: 30000 });

      // Se GraphHopper retornar a solução diretamente
      if (ghResp.data.solution) {
        return ghResp.data.solution;
      }

      // Caso contrário, retorna o ID para consulta posterior
      return ghResp.data;
    } catch (err) {
      if (err.response) {
        throw new Error(
          `Erro GraphHopper: ${err.response.status} - ${JSON.stringify(
            err.response.data
          )}`
        );
      }
      throw new Error(`Falha na chamada ao GraphHopper: ${err.message}`);
    }
  },
};
