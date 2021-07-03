const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { MySetting } = require("../my_setting");


/**
 * id, uuid, name, sellingPrice, isTypeOrder, listTypeorder, image, 
 */
class ProductModel extends Model{};
ProductModel.init({
    uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    sellingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    hargaModal: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    barcode: DataTypes.STRING,
    curentStock: DataTypes.INTEGER,
    minimStock: DataTypes.INTEGER,
    note: DataTypes.STRING

}, {sequelize});

class ProductOutlet extends Model{};
ProductOutlet.init({
    uuid: DataTypes.UUID,
    outletId: DataTypes.INTEGER,
    name: DataTypes.STRING
}, {sequelize});

class ProductTypeOrder extends Model{};
ProductTypeOrder.init({
    uuid: DataTypes.UUID,
    name: DataTypes.STRING,
    outletId: DataTypes.INTEGER,
    typeOrderId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
}, {sequelize});

const ListProductOutlet = ProductModel.hasMany(ProductOutlet, {
    as: 'outlet',
    foreignKey: 'productId',
    constraints: false
});

const ListProductTypeOrder = ProductModel.hasMany(ProductTypeOrder, {
    as: "typeOrder",
    foreignKey: "productId",
    constraints: false
})


;(async () => { 
    MySetting.isForce = true;
    await ProductModel.sync({force: MySetting.isForce}); 
    await ProductOutlet.sync({force: MySetting.isForce});
    await ProductTypeOrder.sync({force: MySetting.isForce});
   
})();

module.exports = {ProductModel, ListProductOutlet, ListProductTypeOrder};