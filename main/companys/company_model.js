const { Model, DataTypes, Sequelize } = require("sequelize");
const { MySetting } = require("../my_setting");
const {sequelize} = require('../database');

/**
 * uuid, name, address, phone
 */
class CompanyModel extends Model{};
CompanyModel.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
}, { sequelize });

;(async () => {
    await CompanyModel.sync({force: MySetting.isForce});
})();


module.exports = { CompanyModel };