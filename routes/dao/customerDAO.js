const getDB = require('../../utils/getDBConn')
import { ObjectId } from 'mongodb'
async function loginDAO(data) {
    const db = await getDB()
    const collection = db.collection("customers")
    const result = await collection.findOne(data)
    return result;
}

async function regDAO(data) {
    console.log("dao")
    const db = await getDB();
    const collection = db.collection("customers")
    const result = await collection.insertOne(data);
    return result;
}

async function getOrdersDAO(id) {
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.find({ _id: ObjectId.createFromHexString(id) }).toArray();
    return result;
}

async function saveOrderDAO(data) {
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.insertOne(data)
    return result;
}

async function cancelOrderDAO(orderId) {
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.updateOne({ _id: ObjectId.createFromHexString(orderId) }, { $set: { status: 'cancel' } },)
    return result;
}


async function getCartDAO(id) {
    const db = await getDB()
    const collection = db.collection("cart")
    const result = await collection.find({ customerId: id }).toArray();
    return result;
}

async function saveToCartDAO(data) {
    const db = await getDB()
    const collection = db.collection("cart")
    const result = await collection.insertOne(data)
    return result;
}

async function deleteCartService(orderId) {
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(orderId) }, { $set: { status: 'cancel' } },)
    return result;
}

async function getProductsDAO() {
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.find({}).toArray()
    console.log(1, result)
    return result;
}


module.exports = {
    regDAO,
    loginDAO,
    getOrdersDAO,
    getProductsDAO,
    saveOrderDAO,
    cancelOrderDAO,
    getCartDAO,
    deleteCartService,
    saveToCartDAO
}