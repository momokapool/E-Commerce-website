const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email: email })  //check if user already exists in the database
    if (!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error("User already exist");
    }
})

const loginUserCtrl = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    const findUser = await User.findOne( {'email': email});
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            message : "Logged In",
        })
    } else {
        throw new Error("Wrong username or password")
    }
})





module.exports = { createUser, loginUserCtrl }

