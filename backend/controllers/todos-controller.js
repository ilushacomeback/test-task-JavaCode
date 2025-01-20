const ApiError = require('../exceptions/api-error');
const todosService = require('../service/todos-service');
const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

const verifyToken = async (req) => {
  const { authorization } = req.headers;
  try {
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const user = jwt.verify(
        authorization.split(' ')[1],
        process.env.ACCESS_TOKEN
      );
      const dataUser = await userModel.getUser(user.email);
      if (!dataUser) {
        throw ApiError.UnauthorizedError();
      }
    } else {
      throw ApiError.UnauthorizedError();
    }
  } catch (e) {
    if (e.message === 'jwt expired') {
      throw ApiError.BadRequest('access expired', ['access expired'])
    } else {
      throw ApiError.UnauthorizedError();
    }
  }
};

class TodosController {
  async getTasks(req, res, next) {
    try {
      await verifyToken(req);
      const { userId } = req.params;
      const data = await todosService.getTasks(userId);
      return res.json(data);
    } catch (e) {
      console.log('err', e);
      next(e);
    }
  }

  async addTask(req, res, next) {
    try {
      await verifyToken(req);
      const data = req.body;
      const response = await todosService.addTask(data);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async editTask(req, res, next) {
    try {
      await verifyToken(req);
      const { id } = req.params;
      const data = {...req.body, id};
      console.log('body', data)
      const response = await todosService.editTask(data);
      return res.json(response);
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async removeTask(req, res, next) {
    try {
      await verifyToken(req);
      const { id } = req.params;
      const response = await todosService.removeTask(id);
      return res.json(response);
    } catch (e) {
      console.log(e)
      next(e);
    }
  }
}

module.exports = new TodosController();
