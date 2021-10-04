import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [UserModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [

    ]

    consumer
        .apply(...middlewares)
        .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
