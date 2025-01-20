require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('../router/index');
const errorMiddleware = require('../middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: 'https://test-task-java-code-drab.vercel.app', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'production') {
  const start = () => {
    try {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (e) {
      console.error('Error starting server:', e);
    }
  };

  start();
}

module.exports = app;
