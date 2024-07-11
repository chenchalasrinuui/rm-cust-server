const { regDAO, loginDAO, getOrdersDAO } = require('../dao/customerDAO')
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

async function getOrdersService() {
    const res = await getOrdersDAO();
    return res;
}




module.exports = {
    regService,
    loginService,
    getOrdersService
}
