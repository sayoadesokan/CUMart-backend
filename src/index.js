const express = require('express');
const { MONGO_URL, PORT } = require('./config');
const expressApp = require('./services/expressApp');
const { dbConnection } = require('./database/connection');
const app = express();

const startServer = async () => {
  try {
    await expressApp(app);
    await dbConnection(MONGO_URL),
      app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
      });
  } catch (error) {
    console.log(error);
  }
};

startServer();
