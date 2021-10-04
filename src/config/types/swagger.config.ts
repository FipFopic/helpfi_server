import { RootConfig } from './RootConfig'
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'

export class SwaggerConfig extends RootConfig {
  readonly SWAGGER_PREFIX: string
  private readonly SWAGGER_TITLE: string
  private readonly SWAGGER_VERSION: string

  constructor(config) {
    super(config)
  }

  public getSwaggerOptions(): Omit<OpenAPIObject, 'paths'> {
    const options = new DocumentBuilder()
        .setTitle(this.SWAGGER_TITLE)
        .setVersion(this.SWAGGER_VERSION)
        .addBearerAuth()
        .build()

    return options
  }
}
