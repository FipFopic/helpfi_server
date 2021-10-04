import { INestApplication } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { configService } from 'src/config/config.service'

class SwaggerService {
  public createSwaggerDocs(app: INestApplication): void {
    const options = configService.swagger.getSwaggerOptions()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup(configService.swagger.SWAGGER_PREFIX, app, document)
  }
}

export const swaggerService = new SwaggerService()
