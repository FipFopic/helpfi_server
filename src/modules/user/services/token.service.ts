import { prisma } from './../../../database/client.database'
import * as jwt from 'jsonwebtoken'
import { configService } from 'src/config/config.service'
import { UserData } from 'src/modules/user/interfaces/user.interface'

interface ITokens {
  accessToken: string,
  refreshToken: string
}

export class TokenService {
  public generateTokens(payload: UserData): ITokens {
    const accessToken = jwt.sign(
      payload,
      configService.server.SECRET_ACCESS_KEY_JWT_TOKEN,
      { expiresIn: '30m' }
    )
    const refreshToken = jwt.sign(
      payload,
      configService.server.SECRET_REFRESH_KEY_JWT_TOKEN,
      { expiresIn: '14d' }
    )

    return { accessToken, refreshToken }
  }

  /**
   * AccessToken returns matching user information
   * @param accessToken AccessToken
   */
  public validateAccessToken(token: string): UserData | null {
    try {

      const userData = jwt.verify(token, configService.server.SECRET_ACCESS_KEY_JWT_TOKEN)

      return userData as UserData

    } catch (e: any) {
      return null
    }
  }

  /**
   * RefreshToken returns matching user information
   * @param userId User ID
   * @param refreshToken RefreshToken
   */
  // public async validateRefreshToken(userId: number, refreshToken: string): any {
      // const user = await prisma.user.findFirst({
      //   where: { id: userId, refreshToken }
      // })
      
      // if (!user) {
        // return null
      // }

      // const userData = jwt.verify(token, configService.server.SECRET_REFRESH_KEY_JWT_TOKEN)

      // return userData as UserData
  // }
}
