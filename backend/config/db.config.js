const { Pool } = require('pg');

const pool = new Pool({
  user: 'todo',
  host: process.env.RENDER_HOST,
  database: process.env.RENDER_DATABASE,
  password: process.env.RENDER_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool
