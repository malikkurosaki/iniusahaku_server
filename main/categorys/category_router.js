const express = require('express');
const { AuthToken } = require('../auth_token');
const { CategoryController } = require('./category_controller');
const categoryRouter = express.Router();
const CATEGORY = '/category';

categoryRouter.get(CATEGORY, AuthToken.authenticateToken, CategoryController.get );
categoryRouter.post(CATEGORY, AuthToken.authenticateToken, CategoryController.post );
categoryRouter.put(CATEGORY, AuthToken.authenticateToken, CategoryController.put );
categoryRouter.delete(CATEGORY+'/:id', AuthToken.authenticateToken, CategoryController.delete );

module.exports = {categoryRouter}