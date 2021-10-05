import { Body, Controller, Get, HttpCode, HttpStatus, Post, Response } from '@nestjs/common'
import { Request as RequestExpress, Response as ResponseExpress } from 'express'
import { TokenService } from './services/token.service'
import { CreateUserDto } from './dtos/createUser.dto'
import { LoginUserDto } from './dtos/loginUser.dto'
import { UserService } from './services/user.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() user: LoginUserDto, @Response() res: ResponseExpress) {
    const userData = await this.userService.login(user)
    const { accessToken, refreshToken } = this.tokenService.generateTokens(userData)
  
    await this.userService.saveRefreshToken(userData.id, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    res.json({ ...userData, accessToken, refreshToken })
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/registration')
  async registerUser(@Body() user: CreateUserDto, @Response() res: ResponseExpress) {
    const userData = await this.userService.createUser(user)
    const { accessToken, refreshToken } = this.tokenService.generateTokens(userData)

    await this.userService.saveRefreshToken(userData.id, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    res.json({ ...userData, accessToken, refreshToken })
  }

  @HttpCode(HttpStatus.OK)
  @Get('/profile')
  async getUserProfile() {
    
  }
}
