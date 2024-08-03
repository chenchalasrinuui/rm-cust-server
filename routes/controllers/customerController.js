var express = require('express')
var router = express.Router()
var validateToken = require('../../utils/validateToken')
const { saveAddressService, addressListService, regService, loginService, getOrdersService, getProductByIdService, getProductsService, saveOrderService, saveToCartService, deleteCartService, getCartService } = require('../services/customerService')

router.post("/login", async function (req, res, next) {
    try {
        const result = await loginService(req)
        res.send(result)
    } catch (ex) {
        console.error(ex)
        res.send(ex.message)
    }

})
router.post('/register', async function (req, res, next) {
    try {
        const result = await regService(req)
        res.send(result)

    } catch (ex) {
        console.error(ex);
        res.send(ex.message);
    }

})

router.post('/save-order', validateToken, function (req, res, next) {
    try {
        (async function () {
            const result = await saveOrderService(req);
            res.send(result)
        })()
    } catch (ex) {
        console.error(ex);
        res.send(ex.message);
    }
})

router.get(
    "/orders-list",
    validateToken,
    function (req, res, next) {
        try {
            (async function () {
                const result = await getOrdersService(req);
                res.send(result)
            })()
        } catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    })

router.delete('/cancelOrder', validateToken, function (req, res, next) {
    try {
        (async function () {
            const result = await cancelOrderService(req)
            res.send(result)
        })()

    } catch (ex) {
        console.error(ex);
        res.send(ex.message)
    }
})

router.post('/saveToCart', validateToken, function (req, res, next) {
    try {
        (async function () {
            const result = await saveToCartService(req);
            res.send(result)
        })()
    } catch (ex) {
        console.error(ex);
        res.send(ex.message);
    }
})

router.get(
    "/cartList",
    validateToken,
    function (req, res, next) {
        try {
            (async function () {
                const result = await getCartService(req);
                res.send(result)
            })()
        } catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    })

router.delete('/deleteCart', validateToken, function (req, res, next) {
    try {
        (async function () {
            const result = await deleteCartService(req)
            res.send(result)
        })()

    } catch (ex) {
        console.error(ex);
        res.send(ex.message)
    }
})


router.get("/getProducts", function (req, res, next) {
    try {
        (async () => {
            const result = await getProductsService();
            res.send(result)
        })()

    } catch (ex) {
        console.error(ex);
        res.send(ex.message)
    }

})

router.get("/getProductById", function (req, res, next) {
    try {
        (async () => {
            const result = await getProductByIdService(req);
            res.send(result)
        })()

    } catch (ex) {
        console.error(ex);
        res.send(ex.message)
    }

})


router.post('/saveAddress', validateToken, function (req, res, next) {
    try {
        (async function () {
            const result = await saveAddressService(req);
            res.send(result)
        })()
    } catch (ex) {
        console.error(ex);
        res.send(ex.message);
    }
})

router.get(
    "/addressList",
    validateToken,
    function (req, res, next) {
        try {
            (async function () {
                const result = await addressListService(req);
                res.send(result)
            })()
        } catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    })

module.exports = router;
