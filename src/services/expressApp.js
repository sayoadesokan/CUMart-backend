const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const adminRoutes = require('../routes/adminRoutes');
const studentRoutes = require('../routes/studentRoutes');
const { router } = require('../routes/productRoutes');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(helmet());

  //admin routes
  app.use('/v1/admin', adminRoutes.router);
  app.use('/v1/student', studentRoutes.router);
  app.use('/v1/product', router);

  return app;
};
