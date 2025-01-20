const todosModel = require('../models/todos-model');

class TodosService {
  async getTasks(userId) {
    const data = await todosModel.getTasks(userId);
    return data;
  }

  async addTask(data) {
    const response = await todosModel.addTask(data);
    return response;
  }

  async editTask(data) {
    console.log('dat', data)
    const response = await todosModel.editTask(data);
    return response;
  }

  async removeTask(id) {
    const data = await todosModel.removeTask(id);
    return data;
  }
}

module.exports = new TodosService();
