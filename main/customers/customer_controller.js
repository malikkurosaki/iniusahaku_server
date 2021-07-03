const expressAsyncHandler = require("express-async-handler");
const { CustomerModel } = require("./customer_model");

class CustomerController{

    static get = expressAsyncHandler(
        async (req, res) => {
            const _uuid = req.user.uuid;
            await CustomerModel.findAll({
                where: {
                    uuid: _uuid
                }
            }).then( data => {
                res.json({
                    status: true,
                    data: data
                })
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
            const _uuid = req.user.uuid;
            const _body = req.body;
            _body.uuid = _uuid;

            await CustomerModel.create(_body)
            .then( data => {
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
            const _id = _body.id;

            await CustomerModel.update(_body, {
                where: {
                    uuid: _uuid,
                    id: _id
                }
            }).then( data => {
                const _gagal = data == 0;
                res.json({
                    status: _gagal? false: true,
                    message: _gagal? "data tidal terdapat di database": "berhasil mengupdate data"
                });
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

            await CustomerModel.destroy({
                where:{
                    uuid: _uuid,
                    id: _id
                }
            }).then( data =>{
                const _gagal = data == 0;
                res.json({
                    status: _gagal? false: true,
                    message: _gagal? "data tidak terdapat pada adatabase": "berhasil menghapus data"
                });
            }).catch( erro => {
                res.json({
                    status: false,
                    message: erro
                })
            })
        }
    );
}

module.exports = {CustomerController};