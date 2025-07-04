const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

const authMiddleware = (role) => {
    // console.log("role expected", role);
    //role is array of allowed people
    return (req, res, next) => {
        try {
            //this MW checks the token
            //token is sent through headers
            let token = req.headers?.authorization?.split(" ")[1]
            if (!token) {
                res.status(404).json({ msg: "token not found...!" })
            } else {
                //token found
                //if token found then checks for its validity
                let decoded = jwt.verify(token, JWT_SECRETKEY);
                if (decoded) {
                    //everything is fine
                    //attach userId from decoded into req, so that the userId will be used in CRUD operations
                    if (role.includes(decoded.role)) {
                        req.userId = decoded.userId;
                        // console.log("role passed", decoded.role);
                        //console.log(req.body);
                        //now it is ready to move to next protected route
                        next();
                    } else {
                        res.status(401).json({ msg: "Not Authorised!" })
                    }
                }
            }
        } catch (error) {
            res.status(404).json({ msg: "Internal Server Error... Please Login Again" })
        }
    }
}

module.exports = authMiddleware; 