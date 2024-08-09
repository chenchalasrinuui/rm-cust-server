const { addressListDAO, deleteCartDAO, saveAddressDAO, regDAO, loginDAO, getCartDAO, getOrdersDAO, getProductsDAO, getProductByIdDAO, saveOrderDAO, saveToCartDAO } = require('../dao/customerDAO')
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

async function regService(req) {
    const data = req.body.data;
    let result = await regDAO(data);
    return result;
}

async function getOrdersService(req) {
    const id = req.query.id;
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
    return res.map((obj) => {
        return { ...obj?.productDetails, prouctId: obj?.productId, _id: obj._id }
    })
}

async function saveToCartService(req) {
    const data = req.body.data
    const res = await saveToCartDAO(data)
    return res;
}

async function deleteCartService(req) {
    const productId = req.query.productId;
    const uid = req?.query?.uid;
    const res = await deleteCartDAO(productId, uid)
    return res;
}


async function getProductsService() {
    const res = await getProductsDAO();
    return res;
}

async function getProductByIdService(req) {
    console.log(1, req?.query?.id)
    const res = await getProductByIdDAO(req?.query?.id);
    return res;
}

async function addressListService(req) {
    const id = req.body.id;
    const res = await addressListDAO(id);
    return res.map(({ name, phone, city, state, pin }) => {
        return {
            address: `${name},
            ${phone}, ${city}, ${state}, ${pin}.
            `
        }
    })
}

async function saveAddressService(req) {
    const data = req.body.data
    const res = await saveAddressDAO(data)
    return res;
}



module.exports = {
    addressListService,
    saveAddressService,
    regService,
    loginService,
    getOrdersService,
    getProductsService,
    saveOrderService,
    cancelOrderService,
    getCartService,
    saveToCartService,
    deleteCartService,
    getProductByIdService
}
