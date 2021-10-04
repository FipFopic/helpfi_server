import { env } from './env'
import { MailConfig } from './types/mail.config'
import { ServerConfig } from './types/server.config'
import { SwaggerConfig } from './types/swagger.config'

export class ConfigService {
  readonly server: ServerConfig
  readonly swagger: SwaggerConfig
  readonly mail: MailConfig

  constructor() {
    this.server = new ServerConfig(env.server)
    this.swagger = new SwaggerConfig(env.swagger)
    this.mail = new MailConfig(env.mail)
  }
}

export const configService = new ConfigService()
