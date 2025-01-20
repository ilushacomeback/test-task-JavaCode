require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware)

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`listen: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();