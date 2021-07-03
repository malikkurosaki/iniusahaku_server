const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../database');
const { MySetting } = require("../my_setting");

class TypeOrderModel extends Model{};
TypeOrderModel.init({
    uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {sequelize});

;(async () => { await TypeOrderModel.sync({force: MySetting.isForce}); })();

module.exports = {TypeOrderModel}