const expressAsyncHandler = require("express-async-handler");

class HomeController{

    static home = expressAsyncHandler(
        async (req, res) => {
            res.send('this home');
        }
    )

    static handle404 = expressAsyncHandler(
        async (req, res) => {
            res.status(404).send('oh no 404');
        }
    )
}

module.exports = { HomeController }