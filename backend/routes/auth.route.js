const express = require("express");
const { userSignup, userLogin } = require("../controllers/auth.controller");

const UserRouter = express.Router();

//signup
UserRouter.post("/signup",userSignup)

//login
UserRouter.post("/login",userLogin)


module.exports = UserRouter;