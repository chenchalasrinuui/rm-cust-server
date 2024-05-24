var express = require('express')
var router = express.Router()
var validateToken = require('../../utils/validateToken')
const { regService, loginService } = require('../services/customerService')

router.post("/login", async function (req, res, next) {
    try {
        const data = req.body.data
        const result = await loginService(data)
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
        res.send("get orders")
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

/*
url: http://localhost:2020/cust/register
method: post
request payload

{
    "data":{
        "uid":"c1",
        "password":"p1",
        "phone":"34343",
        "email":"ss@gmail.com"
    }
}

response

{
    "acknowledged": true,
    "insertedId": "664ee85516b62a5c22d26bb5"
}
*/

