const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const saltRounds = 10;
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;


//signup
const userSignup = async (req, res) => {
    //name email and password will be coming from req.body as objects
    //hash the password and store in db
    //hash?? use bcrypt
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with this email already exists" });
        }
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            //store hash in your password DB
            if (err) {
                //hash generation failed 
                return res.status(500).json({ msg: "Internal server error", Error: err.message });
            } else {
                //hash generated
                await UserModel.create({ ...req.body, password: hash });
                res.status(201).json({ msg: "SignUp Success!" });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", Error: error.message });
    }
}


//login
const userLogin = async(req,res) => {
    //email and password from req.body
    //compare the password stored in db and password coming from req.body
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    // console.log(user);
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            //hashing operation failed
            res.status(500).json({ msg: "Internal Server Error!" })
        } else {
            //comparison success
            if (result) {
                //password matches
                //generate the token and send along with response 
                const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRETKEY);
                res.status(200).json({ msg: "Login Success!", token })
            } else {
                //password not matching
                res.status(403).json({ msg: "Wrong Password!" })
            }
        }
    });
}


module.exports = { userSignup, userLogin }