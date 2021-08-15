

const JWT_SECRET_KEY = 'json-server-auth-123456';
const jwt = require('jsonwebtoken');

function checkjwt(req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).jsonp('Missing authorization header')
        return;
    }
    const [scheme, token] = authorization.split(' ')
    if (scheme !== 'Bearer') {
        res.status(401).jsonp('Incorrect authorization scheme')
        return;
    }
    if (!token) {
        res.status(401).jsonp('Missing token')
        return
    }
    try {
        jwt.verify(token, JWT_SECRET_KEY)
        // Add claims to request
        req.claims = jwt.decode(token)
        next()
    } catch (err) {
        res.status(401).jsonp(err.message)
    }
}
exports.checkjwt = checkjwt;