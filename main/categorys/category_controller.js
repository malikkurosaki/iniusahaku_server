const expressAsyncHandler = require("express-async-handler");
const { CategoryModel } = require("./category_model");

class CategoryController{

    static get = expressAsyncHandler(
        async (req, res) => {
            const _uuid = req.user.uuid;
            await CategoryModel.findAll({
                where: {
                    uuid: _uuid
                }
            })
            .then( data => {
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
            await CategoryModel.create(_body)
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
                });
            });
        }
    );

    static put = expressAsyncHandler(
        async (req, res) => {
           const _uuid = req.user.uuid;
           const _body = req.body;
           const _id = _body.id;

           await CategoryModel.update(_body, {
               where: {
                   uuid: _uuid,
                   id: _id
               }
           }).then ( data => {
               const _gagal = data == 0;
                res.json({
                    status: _gagal? false: true,
                    message: _gagal? "gagal mengupdate data": "data berhasil diupdate"
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
           const _id = req.params.id;
           const _uuid = req.user.uuid;
           await CategoryModel.delete({
               where: {
                    uuid: _uuid,
                    id: _id
               }
           }).then ( data => {
               const _gagal = data == 0;
               res.json({
                   status: _gagal? false: true,
                   message: _gagal? "data tidak ada ": "berhasil menghapus data"
               })
           }).catch( error => {
               res.json({
                   status: false,
                   message: error
               })
           })
        }
    );
}


module.exports = { CategoryController };