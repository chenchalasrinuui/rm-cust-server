const getDB = require('../../utils/getDBConn')
const { ObjectId } = require('mongodb')
async function loginDAO(data) {
    const db = await getDB()
    const collection = db.collection("customers")
    const result = await collection.findOne(data)
    if (result) {
        const cart = await db.collection("cart");
        const count = await cart.countDocuments({ uid: result?._id?.toString() })
        result.count = count;
    }
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
    const orders = db.collection("orders")
    const result = await orders.aggregate([
        {
            $lookup: {
                from: "products",
                localField: 'productId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $project: {
                _id: 1,
                productId: 1,
                productDetails: 1
            }
        }]).toArray();

    return result;
}

async function saveOrderDAO(data) {
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.insertOne({ ...data, productId: ObjectId.createFromHexString(data.productId) })
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
    const result = await collection.aggregate([
        {
            $lookup: {
                from: "products",
                localField: 'productId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $project: {
                _id: 1,
                productId: 1,
                productDetails: 1
            }
        }]).toArray();
    return result;
}

async function saveToCartDAO(data) {
    const db = await getDB()
    const collection = db.collection("cart")
    const cartItems = await collection.find({ productId: ObjectId.createFromHexString(data?.productId), uid: data?.uid }).toArray();
    if (cartItems?.length == 0) {
        const result = await collection.insertOne({ ...data, productId: ObjectId.createFromHexString(data.productId) })
        const count = await collection.countDocuments({ uid: data?.uid })
        return { ...result, count }
    } else {
        return {
            message: "Already added to the cart"
        }
    }
}

async function deleteCartDAO(productId, uid) {
    const db = await getDB()
    const collection = db.collection("cart")
    const result = await collection.deleteOne({ productId: ObjectId.createFromHexString(productId), uid })
    if (result?.deletedCount > 0) {
        const count = await collection.countDocuments({ uid })
        result.count = count;
    }
    return result;
}

async function getProductsDAO() {
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.find({}).toArray()
    console.log(1, result)
    return result;
}

async function getProductByIdDAO(id) {
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.find({ _id: ObjectId.createFromHexString(id) }).toArray()
    return result[0]
}


async function addressListDAO(id) {
    const db = await getDB()
    const collection = db.collection("address")
    const result = await collection.find().toArray();
    return result;
}

async function saveAddressDAO(data) {
    const db = await getDB()
    const collection = db.collection("address")
    const result = await collection.insertOne(data)
    return result;
}

async function getCustomerByIdDAO(id) {
    const db = await getDB()
    const collection = db.collection("customers")
    const result = await collection.find({ _id: ObjectId.createFromHexString(id) }).toArray()
    return result;
}

async function updateProfileDAO(req, res, upload) {
    upload(req, res, async (err) => {

        if (err) {
            res.send("issue with profile pic upload")
        }
        const { id, uid, password, phone, extension } = req.body;
        const db = await getDB()
        const collection = db.collection("customers")
        const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { uid, password, phone, profile: `${id}.${extension}` } });
        return result;
    })

}



module.exports = {
    saveAddressDAO,
    addressListDAO,
    regDAO,
    loginDAO,
    getOrdersDAO,
    getProductsDAO,
    saveOrderDAO,
    cancelOrderDAO,
    getCartDAO,
    deleteCartDAO,
    saveToCartDAO,
    getProductByIdDAO,
    getCustomerByIdDAO,
    updateProfileDAO
}