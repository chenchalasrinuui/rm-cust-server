var express = require('express')
var router = express.Router()
var validateToken = require('../../utils/validateToken')
const { regService, loginService, getOrdersService } = require('../services/customerService')

router.post("/login", async function (req, res, next) {
    try {
        const result = await loginService(req)
        res.send(result)
    } catch (ex) {
        console.error(ex)
        res.send(ex.message)
    }

})

router.get(
    "/orders-list",
    validateToken,
    function (req, res, next) {
        (async function () {
            const result = await getOrdersService();
            res.send(result)
        })()
    })


router.post('/register', async function (req, res, next) {
    try {
        console.log('controller')
        var data = req.body.data;
        const result = await regService(data)
        res.send(result)

    } catch (ex) {
        console.error(ex);
        res.send(ex.message);
    }

})

module.exports = router;
