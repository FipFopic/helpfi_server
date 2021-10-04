import { NestFactory } from '@nestjs/core'
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser'
import { ApplicationModule } from './app.module'
import { configService } from './config/config.service'
import { logger, stream } from './utils/Logger/logger.service'
import { swaggerService } from './utils/Swagger/swagger.service'

const start = async () => {
  try {

    const appOptions = configService.server.getApplicationOptions()
    const PORT = configService.server.PORT
    const app = await NestFactory.create(ApplicationModule, appOptions)

    app.setGlobalPrefix(configService.server.API_PREFIX)
    app.use(morgan('tiny'))
    app.use(cookieParser())

    swaggerService.createSwaggerDocs(app)

    await app.listen(PORT, () => logger.info(`Server has been started on port ${PORT}`))

  } catch (e: any) {
    logger.error(`Server run error: ${e}`)
  }
}

start()
