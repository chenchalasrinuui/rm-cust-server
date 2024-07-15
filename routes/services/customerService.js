const { regDAO, loginDAO, getOrdersDAO, getProductsDAO, saveOrderDAO } = require('../dao/customerDAO')
const jwt = require('jsonwebtoken')

async function loginService(req) {
    const data = req.body.data;
    let result = await loginDAO(data)
    if (result) {
        const token = jwt.sign(data, "appToken")
        result = {
            data: {
                ...result,
                token
            }
        }
    } else {
        result = {
            data: { message: 'InValid Credentials' }
        }
    }
    return result;
}

async function regService(data) {
    console.log("service")
    let result = await regDAO(data);
    return result;
}

async function getOrdersService(req) {
    const id = req.body.id;
    const res = await getOrdersDAO(id);
    return res;
}

async function saveOrderService(req) {
    const data = req.body.data
    const res = await saveOrderDAO(data)
    return res;
}

async function cancelOrderService(req) {
    const orderId = req.query.orderId;
    const res = await cancelOrderDAO(orderId)
    return res;
}

async function getCartService(req) {
    const id = req.body.id;
    const res = await getCartDAO(id);
    return res;
}

async function saveToCartService(req) {
    const data = req.body.data
    const res = await saveToCartDAO(data)
    return res;
}

async function deleteCartService(req) {
    const orderId = req.query.orderId;
    const res = await deleteCartDAO(orderId)
    return res;
}


async function getProductsService() {
    const res = await getProductsDAO();
    return res;
}




module.exports = {
    regService,
    loginService,
    getOrdersService,
    getProductsService,
    saveOrderService,
    cancelOrderService,
    getCartService,
    saveToCartService,
    deleteCartService
}
