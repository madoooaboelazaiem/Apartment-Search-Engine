const express = require('express');
const { config } = require('../../config');
const route = express.Router();

/* GET home page. */
route.get('/', function (req, res) {
  return res.redirect(`${config.host}/graphql`);
});
route.get('/healthcheck', function (req, res) {
  return res.status(201).send('Server Working');
});

module.exports = route;
