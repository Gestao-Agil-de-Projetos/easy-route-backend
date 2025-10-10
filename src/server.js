import { app } from "./app.js";
import { envs } from "./utils/envs.js";

const start = async () => {
  try {
await app.listen({ port: envs.PORT, host: '0.0.0.0' });    app.log.info(`🚀 app running on ${envs.HOST}:${envs.PORT}/`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
