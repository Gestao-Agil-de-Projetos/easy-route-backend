import { app } from './app.js'
import { envs } from './utils/envs.js'

const start = async () => {
  await app.listen({ port: envs.PORT, host: envs.HOST });
  app.log.info(`app running on ${envs.HOST}:${envs.PORT}/`)
}

start()
