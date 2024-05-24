const { regDAO, loginDAO } = require('../dao/customerDAO')
const jwt = require('jsonwebtoken')
async function loginService(data) {
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


module.exports = {
    regService,
    loginService
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjMSIsInBhc3N3b3JkIjoicDEiLCJpYXQiOjE3MTY1MzE0Mzh9.DNYvfez7Qm2VNBUYw_F4dKShR8JKct7ERqbX2w3doSs