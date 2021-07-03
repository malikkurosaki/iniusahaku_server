const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../database');
const { MySetting } = require("../my_setting");

/**
 * uuid
 * userName
 * email
 * password
 * phone
 */
class UserModel extends Model{};
UserModel.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: {
            name: 'email duplicate',
            msg: 'email has used'
        },
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize });

;(async () => {
    await UserModel.sync({force: MySetting.isForce});
})();

module.exports = {UserModel};