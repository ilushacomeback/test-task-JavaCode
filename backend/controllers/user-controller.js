const userService = require('../service/user-service');
const tokenService = require('../service/token-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = errors.array().reduce((acc, { path }) => {
          console.log(path);
          switch (path) {
            case 'email':
              acc[path] = 'Некорректный email';
              break;
            case 'password':
              acc[path] = 'Пароль должен быть от 8 до 32 символов';
              break;
            case 'username':
              acc[path] = 'Имя обязательно';
              break;
            default:
              break;
          }
          return acc;
        }, {});

        return next(ApiError.BadRequest('Ошибка при валидации', error));
      }
      const { email, password, username } = req.body;
      const userData = await userService.register(username, email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const token = req.cookies.refreshToken;
      if (token) {
        const userData = await tokenService.refreshToken(token);
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json(userData);
      } else {
        return next(ApiError.UnauthorizedError());
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new UserController();
