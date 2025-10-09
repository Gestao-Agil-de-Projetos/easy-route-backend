import dotenv from "dotenv";
dotenv.config();

export const isDev = () => process.env.NODE_ENV === 'development'

export const envs = {
  PORT: Number(process.env.PORT) || 7000,
  HOST: process.env.HOST || 'localhost',
  JWT_SECRET: "chave-secreta-para-teste-123456",
}