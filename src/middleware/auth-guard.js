const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
     
    try {
        const headersData = req.headers.authorization.split(" ");
        const token = headersData[1];
        if (headersData[0] !== 'Bearer' || !token) {
            return res.status(401).json({
                status: 'failed',
                errors: {
                    message: 'Unauthorized'
                }
            });
        } 
        const decoded = jwt.verify(token, "this_is_some_random_salt_for_hash");
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'failed',
            errors: {
                message: 'Unauthorized'
            }
        });
    }
};