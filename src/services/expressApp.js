const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const adminRoutes = require('../routes/adminRoutes');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());

  //admin routes
  app.use('/v1/admin', adminRoutes);

  return app;
};
