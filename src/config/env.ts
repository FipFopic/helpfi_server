require('dotenv').config({ path: `.env` })

/**
 * Environment variables
 */
export const env = {
  server: {
    env_mode: process.env.NODE_ENV || 'DEVELOPMENT',
    PORT: Number(process.env.PORT) || 8080,
    API_PREFIX: 'api/v2',
    SECRET_ACCESS_KEY_JWT_TOKEN: process.env.SECRET_ACCESS_KEY_JWT_TOKEN || 'secret',
    SECRET_REFRESH_KEY_JWT_TOKEN: process.env.SECRET_REFRESH_KEY_JWT_TOKEN || 'secret',
    PASSWORD_ROUNDS: 10
  },
  swagger: {
    SWAGGER_TITLE: 'HelpFi API',
    SWAGGER_VERSION: '2.0.0',
    SWAGGER_PREFIX: 'docs/v2'
  },
  mail: {
    HOST: 'smtp.gmail.com',
    PORT: 587,
    SECURE: false,
    USER: 'diganik88@gmail.com',
    PASSWORD: 'Dimarius31'
  }
}
