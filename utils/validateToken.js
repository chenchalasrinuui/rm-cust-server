const jwt = require('jsonwebtoken')

function validateToken(req, res, next) {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "appToken", (e, s) => {
            if (e) {
                res.send("Invalid Token")
            } else {
                next();
            }
        })
    } else {
        res.send("Token Missing")
    }

}
module.exports = validateToken;