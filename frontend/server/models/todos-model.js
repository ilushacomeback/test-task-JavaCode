const db = require('../config/db.config');

class TodosModel {
  async getTasks(userId) {
    const tasks = await db.query(
      `SELECT * FROM todos WHERE user_id='${userId}' ORDER BY id DESC`
    );
    return tasks.rows;
  }

  async addTask(data) {
    const { userId, name, state } = data;
    const response = await db.query(
      `INSERT INTO todos (user_id, name, state) VALUES ('${userId}', '${name}', '${state}') RETURNING id, user_id, name, state`
    );
    return response.rows[0];
  }

  async editTask(data) {
    const updateData = data.state
      ? `state='${data.state}'`
      : `name='${data.name}'`;
    const newData = await db.query(
      `UPDATE todos SET ${updateData} WHERE id=${data.id} RETURNING id, user_id, name, state`
    );
    return newData.rows[0];
  }

  async removeTask(id) {
    await db.query(`DELETE FROM todos WHERE id=${id}`);
    return `deleted task with id ${id}`;
  }
}

module.exports = new TodosModel();
