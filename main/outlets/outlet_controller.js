const expressAsyncHandler = require("express-async-handler");
const { OutletModel } = require("./outlet_model");

class OutletController{
    
    static get = expressAsyncHandler(
        async (req, res) => {
            const _uuid = req.user.uuid;

            await OutletModel.findAll({
                where: {
                    uuid: _uuid
                }
            }).then( result => {
                res.json({
                    status: true,
                    message: "outlet berhasil ditambahkan"
                });
            }).catch( error => {
                res.json({
                    status: false,
                    message: error
                })
            });
        }
    );

    static post = expressAsyncHandler(
        async (req, res) => {

            const uuid = req.user.uuid;
            const _body = req.body;
            _body.uuid = uuid;

            await OutletModel.create(_body)
            .then( result => {
                res.json({
                    status: true,
                    message: "berhasil menambah outlet",
                    data: result
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
            const _id = _body.id;
            
            await OutletModel.update(_body, {
                where: {
                    uuid: _uuid,
                    id: _id
                }
            }).then( result => {
                const gagal = result == 0;
                res.json({
                    status: gagal? false: true,
                    message: gagal? "data tidak terdapat di database": "berhasil mengupdate outlet",
                    data: result
                })
            }).catch( error => {
                res.json({
                    status: false,
                    message: error
                })
            });
        }
    );

    static delete = expressAsyncHandler(
        async (req, res) => {
            const _uuid = req.user.uuid;
            const _id = req.params.id;

            await OutletModel.destroy({
                where: {
                    uuid: _uuid,
                    id: _id
                }
            }).then( result => {
                res.json({
                    status: result == 0? false: true,
                    message: result == 0? "data tidak terdapat di database": "berhasil menghapus outlet"
                })
            }).catch( error => {
                res.json({
                    status: false,
                    message: "gagal menghapus outlet"
                })
            }) 
        }
    );

}


module.exports = {OutletController};

