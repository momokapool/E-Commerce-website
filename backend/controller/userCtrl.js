const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')
const { generateRefreshToken } = require('../config/refreshToken')
const { validateMongo } = require('../ultis/validateMongodb')
const jwt = require('jsonwebtoken')


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

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.password == password)) {
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateLoginuser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        }, {
            new: true
        });
        res.cookie("refreshToken", refreshToken, {

        })
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






const loginAdminCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });

    if (findAdmin.role != 'admin') {
        throw new Error('me may beo')
    }
    if (findAdmin && (await findAdmin.password == password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id)
        const updateLoginuser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken
        }, {
            new: true
        });
        res.cookie("refreshToken", refreshToken, {

        })
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            token: generateToken(findAdmin?._id)
        })
    } else {
        throw new Error("Wrong username or password")
    }
})









const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate({ refreshToken: user.refreshToken }, {
        $unset: { refreshToken: "" }
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); // forbidden
});


const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getAllUser = await User.find()
        res.json(getAllUser)
    } catch (error) {
        throw new Error(error)
    }
})

const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getAuser = await User.findById(id)
        res.json(getAuser)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser)
    } catch (error) {
        throw new Error(error)
    }
})


const updateUser = asyncHandler(async (req, res) => {
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

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const block = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
        res.json({
            message: "User blocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const block = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
        res.json({
            message: "User unblocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookie
    if (!cookie) {
        throw new Error("No refresh token in cookie")
    } else {
        const refreshToken = cookie.refreshToken
        console.log(refreshToken)
    }

    const user = await User.findOne({ refreshToken })
    if (!user) {
        throw new Error("no refresh token present or not matched")
    } else {
        jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {
            if (err || user.id !== decoded.id) {
                throw new Error("Refresh token is wrong")
            } else {
                const accessToken = generateToken(iser?._id)
                console.log(accessToken)
            }
        })
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body
    validateMongo(_id)
    const user = await User.findById(_id)

    if (password) {
        user.password = password
        const updatePassword = await user.save()
        res.json(updatePassword)
    } else {
        res.json(user)
    }
})


const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser);
    } catch (error) {
        throw new Error(error);
    }
});


const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongo(_id);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});


const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongo(_id);
    try {
        let products = [];
        const user = await User.findById(_id);
        // check if user already have product in cart
        const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object);
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }
        let newCart = await new Cart({
            products,
            cartTotal,
            orderby: user?._id,
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongo(_id);
    try {
        const cart = await Cart.findOne({ orderby: _id }).populate(
            "products.product"
        );
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});


const emptyCart = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    validateMongo(_id)

    try {
        const user = await User.findOne({_id})
        const emptycart = Cart.findOneAndDelete({orderby : user._id})
        res.json(emptycart)
    } catch (error) {
        throw new Error(error)
    }
})




module.exports = { createUser, loginUserCtrl, getAllUser, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, loginAdminCtrl, getWishlist, saveAddress, userCart, getUserCart, emptyCart}

