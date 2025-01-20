const bcrypt = require('bcrypt');
const userModel = require('../models/user-model');
const tokenService = require('./token-service');
const UserDTO = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  error;

  async register(username, email, password) {
    const dataUser = await userModel.getUser(email);
    if (dataUser) {
      const msg = `Пользователь с таким email: '${email}' - занят`;
      this.error = { email: msg };
      throw ApiError.BadRequest(msg, this.error);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await userModel.addUser(username, email, hashPassword);
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }

  async login(email, password) {
    const user = await userModel.getUser(email);

    if (!user) {
      const msg = 'Пользователь не зарегистрирован';
      this.error = { user: msg };
      throw ApiError.BadRequest(msg, this.error);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      const msg = 'Неправильный пароль';
      this.error = { password: msg };
      throw ApiError.BadRequest(msg, this.error);
    }

    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }
}

module.exports = new UserService();
