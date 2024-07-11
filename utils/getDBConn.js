var mongo = require('mongodb')

async function getDB() {
    try {
        const url = process.env.DB_URL;
        const mongoClient = mongo.MongoClient
        const server = await mongoClient.connect(url)
        const db = server.db("nit")
        return db;
    } catch (ex) {
        console.error(ex);
        return ex.message
    }
}

module.exports = getDB