import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TokenService } from './services/token.service'
import { UserController } from './user.controller'
import { UserService } from './services/user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports: []
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes()
  }
}
