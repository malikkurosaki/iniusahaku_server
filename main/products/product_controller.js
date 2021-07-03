const expressAsyncHandler = require("express-async-handler");
const { ProductModel, ListProductTypeOrder, ListProductOutlet } = require("./product_model");

class ProductController{
    
    static get = expressAsyncHandler(
        async (req, res) => {
            const _uuid = req.user.uuid;
            const _outletId = req.params.outletId;
            await ProductModel.findAll({
                where: {
                    uuid: _uuid
                },
                include: [
                    {
                        association: ListProductTypeOrder,
                        as: "typeOrder",
                        where: {
                            uuid: _uuid,
                            outletId: _outletId
                        }
                    },
                    {
                        association: ListProductOutlet,
                        as: "outlet",
                        where:{
                            uuid: _uuid,
                            outletId: _outletId
                        }
                    }
                ]
            })
            .then( data => {
                res.json({
                    status: true,
                    data: data
                });
            }).catch( error => {
                res.json({
                    status: false,
                    message: error
                })
            })
        }
    );

    static post = expressAsyncHandler(
        async (req, res) => {
            const _uuid = req.user.uuid;
            const _body = req.body;
            _body.uuid = _uuid;

           if(_body.typeOrder != null){
                for(var i in _body.typeOrder){
                    _body.typeOrder[i].uuid = _uuid;
                }
           }

           if(_body.outlet != null){
               for(var i in _body.outlet){
                   _body.outlet[i].uuid = _uuid;
               }
           }

            await ProductModel.create(_body,{
                include: [
                    {
                        association: ListProductOutlet,
                        as: 'outlet'
                    },
                    {
                        association: ListProductTypeOrder,
                        as: 'typeOrder'
                    }
                ]
            })
            .then ( data => {
                res.json({
                    status: true,
                    message: "data berhasil ditambahkan",
                    data: data
                });
            }).catch( error => {
                res.json({
                    status: false,
                    message: error
                })
            });
        }
    );

    static put = expressAsyncHandler(
        async (req, res) => {
            const _uuid = req.user.uuid;
            const _body = req.body;
        }
    );

    static delete = expressAsyncHandler(
        async (req, res) => {

        }
    );
}

module.exports = {ProductController};