const express = require('express');
const typeOrderRouter = express.Router();
const { AuthToken } = require('../auth_token');
const { TypeOrderController } = require('./type_order_controller');

const TYPE_ORDER = '/typeOrder';

typeOrderRouter.get(TYPE_ORDER, AuthToken.authenticateToken, TypeOrderController.get );
typeOrderRouter.post(TYPE_ORDER, AuthToken.authenticateToken, TypeOrderController.post );
typeOrderRouter.put(TYPE_ORDER, AuthToken.authenticateToken, TypeOrderController.put );
typeOrderRouter.delete(TYPE_ORDER+'/:id', AuthToken.authenticateToken, TypeOrderController.delete );

module.exports = {typeOrderRouter};