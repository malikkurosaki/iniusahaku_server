const express = require ('express');
const { HomeController } = require('./home_controller');
const homeRouter = express.Router();

homeRouter.get('/', HomeController.home );

module.exports = { homeRouter }