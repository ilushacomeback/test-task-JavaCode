const db = require('../config/db.config');

class UserModel {
  async getUser(email) {
    const user = await db.query('SELECT * FROM users WHERE email=$1::text', [
      email,
    ]);
    return user && user.rows[0];
  }

  async addUser(username, email, hashPassword) {
    const user = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1::text, $2::text, $3::text) RETURNING id, email, username, password',
      [username, email, hashPassword]
    );
    return user.rows[0];
  }
}

module.exports = new UserModel();
