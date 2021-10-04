import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  controllers: [],
  providers: [],
  exports: []
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes()
  }
}
