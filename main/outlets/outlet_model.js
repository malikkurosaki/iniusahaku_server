const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../database');
const { MySetting } = require("../my_setting");

class OutletModel extends Model{};
OutletModel.init({
    uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone2: DataTypes.STRING
}, {sequelize});

;(async () => {
    await OutletModel.sync({force: MySetting.isForce})
})();

module.exports = {OutletModel};