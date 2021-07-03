const { response } = require('express');
const expressAsyncHandler = require('express-async-handler');
const { AuthToken } = require('../auth_token');
const { MySetting } = require('../my_setting');
const { UserModel } = require('./user_model');


class UserController{;

    static getAllUser = expressAsyncHandler (
        async (req, res) => {
            await UserModel.findAll()
            .then( data => {
                res.json({
                    status: true,
                    data: data
                })
            }).catch( error => {
                res.json({
                    status: false,
                    message: error
                });
            });
        }
    );

    static post = expressAsyncHandler(
        async (req, res) => {
            const body = req.body;
            await UserModel.create(body)
            .then( data => {
                const _token = AuthToken.generateAccessToken(data.uuid);
                res.json({
                    status: true,
                    message: "data berhasil ditambahkan",
                    token: _token,
                    data: data
                })

            }).catch ( error => {
                res.json({
                    status: false,
                    message: error
                })
            }); 
        }
    )

    static login = expressAsyncHandler(
        async (req, res) => {
            const {email, password} = req.body;

            await UserModel.findOne({
                where: {
                    email: email,
                    password: password
                }
            }).then( data => {
                const _token = AuthToken.generateAccessToken(data.uuid);
                res.json({
                    status: true,
                    token: _token,
                    data: data
                });
            }).catch( error => {
                res.json({
                    status: false,
                    message: error
                })
            });
        }
    )

    static get = expressAsyncHandler(
        async (req, res) => {
            const uuid = req.user.uuid;

            const result = await UserModel.findOne({
                where: {
                    uuid: uuid
                }
            });

            if(result == null){
                const log = {
                    "uuid": uuid,
                    "result": result
                }

                res.json({
                    "status": false,
                    "message": "kesalahan saat mengambil data user",
                    "log": MySetting.isLogApi? log: ""
                })
                return;
            }

            res.json({
                "status": true,
                "message": "ok",
                "data": result
            })
        }
    );

    static put = expressAsyncHandler(
        async (req, res) => {
            try {
                const uuid = req.user.uuid;
                const body = req.body;

                const result = await UserModel.update( body, {
                    where: {
                        uuid: uuid
                    }
                });

                if(result == null){
                    res.json({
                        "status": false,
                        "message": "gagal update user"
                    });
                    return;
                };

                const user = await UserModel.findOne({
                    where: {
                        uuid: uuid
                    }
                });

                res.json({
                    "status": true,
                    "message": "berhasil update user",
                    "data": user
                });

            } catch (error) {
                res.json({
                    "status": false,
                    "message": error
                })
            }

            
        }
    );

    static delete = expressAsyncHandler(
        async (req, res) => {

            const uuid = req.user.uuid;
            const result = await UserModel.destroy({
                where: {
                    uuid: uuid
                }
            }).then( data => {
                const _gagal = data == 0;
                res.json({
                    status: _gagal? false: true,
                    message: _gagal? "data tidak terdapat didatabase": "berhasil menghapus data"
                })
            }).catch( error => {
                res.json({
                    status: false,
                    message: error
                })
            });
        }
    );
}


module.exports = { UserController, UserModel };