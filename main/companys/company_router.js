const express = require('express');
const { AuthToken } = require('../auth_token');
const { CompanyController } = require('./company_controller');
const companyRouter = express.Router();

const COMPANY = '/company';

companyRouter.get(COMPANY, AuthToken.authenticateToken, CompanyController.get );
companyRouter.post(COMPANY, AuthToken.authenticateToken, CompanyController.post );
companyRouter.put(COMPANY, AuthToken.authenticateToken, CompanyController.put );
companyRouter.delete(COMPANY, AuthToken.authenticateToken, CompanyController.delete );

module.exports  = {companyRouter}