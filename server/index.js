const express = require('express');
const cors = require('cors')
require('dotenv').config();

const webApp = express();

const PORT = process.env.PORT || 5000;

webApp.use(cors());

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});

const homeRoute = require('./routes/homeRoute');
const chatRoute = require('./routes/chatRoute');

webApp.use('/', homeRoute.router);
webApp.use('/chat', chatRoute.router);

webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
