const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../database')
const { MySetting } = require("../my_setting");

class CategoryModel extends Model{};
CategoryModel.init({
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

;(async () => {
    await CategoryModel.sync({force: MySetting.isForce});
})();

module.exports = {CategoryModel}