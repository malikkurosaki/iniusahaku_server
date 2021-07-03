const {Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'xx.sqlite'
});

class Produk extends Model{};
Produk.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER
}, {sequelize});

class ListProductOutlet extends Model{};
ListProductOutlet.init({
    nama: DataTypes.STRING
}, {sequelize});

const Category = Produk.hasMany(ListProductOutlet, {
    as: 'outlet',
    foreignKey: 'idProduct',
    constraints: false
})

;(async () => {
    

    await Produk.sync({force: true});
    await ListProductOutlet.sync({force: true});

    //await buat();

    // await Produk.findAll({
    //     include: ListProductOutlet
    // }).then( data => {
    //     console.log(JSON.stringify(data, null, 3));
    // }).catch( error => {
    //     console.log(error);
    // })
    
    await Produk.findAll({
        include: [
            {
                association: Category,
                as: "outlet",
                where: {
                    nama: "satu"
                }
            }
        ]
    }).then( data => {
        console.log(JSON.stringify(data, null, 4));
    });

})();

async function buat (){
    await Produk.create({
        nama: "malik",
        harga: 5000,
        outlet: [
            {
                nama: "satu"
            },
            {
                nama: "dua"
            }
        ]
    }, {
        include: [
            {
                association: Category,
                as: 'outlet'
            }
        ]
    }).then( data => {
        console.log(data.toJSON());
    }).catch( error => {
        console.log(error);
    })
}



