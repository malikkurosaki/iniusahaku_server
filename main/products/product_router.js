const express = require('express');
const productRouter = express.Router();
const {AuthToken} = require('../auth_token');
const { ProductController } = require('./product_controller');

const PRODUCT = '/product';

productRouter.get(PRODUCT+'/:outletId', AuthToken.authenticateToken, ProductController.get );
productRouter.post(PRODUCT, AuthToken.authenticateToken, ProductController.post );
productRouter.put(PRODUCT, AuthToken.authenticateToken, ProductController.put );
productRouter.delete(PRODUCT, AuthToken.authenticateToken, ProductController.delete );

module.exports = {productRouter};