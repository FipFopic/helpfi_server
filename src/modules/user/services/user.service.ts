import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from '../dtos/loginUser.dto'
import { prisma } from '../../../database/client.database'
import { UserStatus } from '.prisma/client'
import { UserData } from '../interfaces/user.interface'
import { CreateUserDto } from '../dtos/createUser.dto'
import { configService } from 'src/config/config.service'
import { ApiException } from 'src/utils/Errors/api.exception'

@Injectable()
export class UserService {
  public async login(userDto: LoginUserDto): Promise<UserData> {
    const { login, password } = userDto

    const candidate = await prisma.user.findUnique({
      where: { login }
    })

    const isPasswordEquals = await bcrypt.compare(password, candidate.password)

    if (!candidate || !isPasswordEquals) {
      throw ApiException.user.UserWrongLoginOrPassword()
    }
    if (candidate.status === UserStatus.BLOCKED) {
      throw ApiException.user.UserBlocked()
    }
    else if (candidate.status === UserStatus.FROZEN) {
      throw ApiException.user.UserFrozen()
    }

    const res: UserData = { id: candidate.id, login }

    return res
  }

  public async createUser(userDto: CreateUserDto): Promise<UserData> {
    const { login, password, inviteCode } = userDto

    const candidate = await prisma.user.findUnique({
      where: { login }
    })

    if (candidate) {
      throw ApiException.user.UserNotUniq()
    }

    let referrerId = 1
    if (inviteCode) {
      const code = await prisma.inviteCode.findUnique({
        where: { code: inviteCode }
      })
  
      if (code && code.isActive) {
        referrerId = code.userId
      }
    }

    const hashPassword = await bcrypt.hash(password, configService.server.PASSWORD_ROUNDS)

    const createdUser = await prisma.user.create({
      data: { login, password: hashPassword, referrerId }
    })
    
    await prisma.profile.create({ data: { userId: createdUser.id } })

    const res: UserData = { id: createdUser.id, login: createdUser.login }

    return res
  }

  /**
   * Save refresh token to the user
   * @param userId User ID
   * @param refreshToken RefreshToken
   */
  public async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken }
    })
  }
}
