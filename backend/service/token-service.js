const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
const UserDTO = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const jwtConfig = require('../config/auth.config');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, jwtConfig.accessToken.salt, {
      expiresIn: jwtConfig.accessToken.expired,
    });
    const refreshToken = jwt.sign(payload, jwtConfig.refreshToken.salt, {
      expiresIn: jwtConfig.refreshToken.expired,
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const user = await tokenModel.getUser(userId);

    if (user) {
      const dataUser = await tokenModel.updateUserToken(refreshToken, userId);
      return dataUser;
    }

    const token = await tokenModel.create(refreshToken, userId);
    return token;
  }

  async refreshToken(refreshToken) {
    try {
      const userId = await tokenModel.getUserId(refreshToken);
      if (!userId) {
        throw ApiError.UnauthorizedError();
      }
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
      const userData = await tokenModel.getUserData(userId);
      const userDTO = new UserDTO(userData);
      const tokens = this.generateTokens({ ...userDTO });
      await this.saveToken(userDTO.id, tokens.refreshToken);
      return { ...tokens, user: userDTO };
    } catch (e) {
      if (e.message === 'jwt expired') {
        console.log('expired');
      }
      console.log(e);
      throw ApiError.UnauthorizedError();
    }
  }
}

module.exports = new TokenService();
