const expresss = require('express');
const { AuthToken } = require('../auth_token');
const { OutletController } = require('./outlet_controller');
const outletRouter = expresss.Router();

const OUTLET = '/outlet';

outletRouter.get(OUTLET, AuthToken.authenticateToken, OutletController.get );
outletRouter.post(OUTLET, AuthToken.authenticateToken, OutletController.post );
outletRouter.put(OUTLET, AuthToken.authenticateToken, OutletController.put );
outletRouter.delete(OUTLET+'/:id', AuthToken.authenticateToken, OutletController.delete );


module.exports = {outletRouter};