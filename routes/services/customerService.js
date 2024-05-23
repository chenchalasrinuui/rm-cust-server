var { regDAO } = require('../dao/customerDAO')

async function regService(data) {
    console.log("service")
    const result = await regDAO(data);
    return result;
}


module.exports = {
    regService
}
