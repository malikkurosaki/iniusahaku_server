const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { MySetting } = require("../my_setting");

class CustomerModel extends Model{};
CustomerModel.init({
    uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING

}, {sequelize});

;(async () => { await CustomerModel.sync({force: MySetting.isForce});})();

module.exports = {CustomerModel};