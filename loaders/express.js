const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const indexRouter = require('../api/routes');

function expressLoader(expressApp) {
  // load middlewares
  expressApp.use(logger('dev'));
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(cookieParser());

  // add static folders
  expressApp.use(indexRouter);
}

module.exports = { expressLoader };
