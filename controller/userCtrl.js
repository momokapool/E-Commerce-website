const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../config/jwtToken')
const {validateMongo} = require('../ultis/validateMongodb')



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
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: generateToken(findUser?._id)
        })
    } else {
        throw new Error("Wrong username or password")
    }
})


const getAllUser = asyncHandler(async(req, res) =>{
    try {
        const getAllUser = await User.find()
        res.json(getAllUser)
    } catch (error) {
        throw new Error(error)
    }
})

const getSingleUser = asyncHandler(async(req, res)=>{
    const {id} = req.params
    try {
        const getAuser = await User.findById(id)
        res.json(getAuser)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async(req, res)=>{
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser)
    } catch (error) {
        throw new Error(error)
    }
})


const updateUser = asyncHandler(async(req, res)=>{
    const { _id } = req.user;
    validateMongo(_id)
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email
        },
        {
            new: true // it means return the updated user data
        });
        res.json(updateUser)
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const block = await User.findByIdAndUpdate(id, {isBlocked : true}, {new:true});
        res.json({
            message: "User blocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})

const unblockUser = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const block = await User.findByIdAndUpdate(id, {isBlocked : false}, {new:true});
        res.json({
            message: "User unblocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})



module.exports = { createUser, loginUserCtrl, getAllUser, getSingleUser, deleteUser, updateUser, blockUser, unblockUser}

