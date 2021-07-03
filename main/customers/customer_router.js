const express = require('express');
const { AuthToken } = require('../auth_token');
const { CustomerController } = require('./customer_controller');
const customerRouter = express.Router();

const CUSTOMER = '/customer';

customerRouter.get(CUSTOMER, AuthToken.authenticateToken, CustomerController.get );
customerRouter.post(CUSTOMER, AuthToken.authenticateToken, CustomerController.post );
customerRouter.put(CUSTOMER, AuthToken.authenticateToken, CustomerController.put );
customerRouter.delete(CUSTOMER+'/:id', AuthToken.authenticateToken, CustomerController.delete );

module.exports = {customerRouter};