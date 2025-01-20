const db = require('../config/db.config');

class TokenModel {
  async getUser(userId) {
    const user = await db.query('SELECT * FROM tokens WHERE user_id=$1', [
      userId,
    ]);
    return user?.rows && user.rows[0];
  }

  async getUserData(userId) {
    const user = await db.query(
      `SELECT * FROM users WHERE id='${userId}'`
    );
    return user?.rows && user.rows[0];
  }

  async getUserId(refreshToken) {
    const data = await db.query(
      `SELECT user_id FROM tokens WHERE refresh_token='${refreshToken}'`
    );
    return data && data.rows[0]?.user_id;
  }

  async create(refreshToken, userId) {
    const user = await db.query(
      'INSERT INTO tokens (refresh_token, user_id) VALUES ($1::text, $2) RETURNING user_id, refresh_token',
      [refreshToken, userId]
    );
    return user?.rows && user.rows[0];
  }

  async updateUserToken(refreshToken, userId) {
    const user = await db.query(
      'UPDATE tokens SET refresh_token=$1::text WHERE user_id=$2 RETURNING user_id, refresh_token',
      [refreshToken, userId]
    );
    return user?.rows && user.rows[0];
  }
}

module.exports = new TokenModel();
