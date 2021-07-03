const expressAsyncHandler = require("express-async-handler");
const { CompanyModel } = require("./company_model");

class CompanyController{
    static COMPANY = '/company';

    static get = expressAsyncHandler(
        async (req, res) => {
            const uuid = req.user.uuid;
            await CompanyModel.findOne({
                where: {
                    uuid: uuid
                }
            }).then( result => {
                res.json({
                    status: true,
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

    static post = expressAsyncHandler(
        async (req, res) => {
            const uuid = req.user.uuid;
            const body = req.body;
            body.uuid = uuid;
            
            await CompanyModel.create(body)
            .then( data => {
                res.json({
                    status: true,
                    data: data
                })
            }).catch ( error => {
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
            await CompanyModel.update( _body, {
                where: {
                    uuid: _uuid
                }
            }).then( data => {
                const _gagal = data == 0;
                res.json({
                    status: _gagal? false: true,
                    message: _gagal? "data tidak terdapat di database": "data berhasil diupdate"
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
            await CompanyModel.destroy({
                where: {
                    uuid: _uuid
                }
            }).then ( data => {
                const _gagal = data == 0;
                res.json({
                    status: _gagal? false: true,
                    message: _gagal? "data tidak terdapat didatabase": "berhasil menghapus data"
                })
            }).catch ( error => {
                res.json({
                    status: false,
                    message: error
                })
            });
            
        }
    );
}

module.exports = {CompanyController};