const Product = require('../models/productModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const { validateMongo } = require('../ultis/validateMongodb')
const cloudinaryUploadImg = require('../ultis/cloundinary')


const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const createProduct = await Product.create(req.body)
        console.log(createProduct);
    } catch (error) {
        throw new Error(error)
    }
})


const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const findproduct = await Product.findById(id)
        console.log(findproduct)
    } catch (error) {
        throw new Error(error)
    }
})


const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const findAllproduct = await Product.find()
        res.json(findAllproduct)
    } catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await Product.findByIdAndUpdate({ id }, req.body, {
            new: true
        })
        console.log(updateProduct);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.json(deleteProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { productID } = req.body
    try {
        const user = await User.findById(_id)
        const alreadyAdded = user.wishlist.find((id) => id.toString() === productID.toString())
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(_id, {
                $pull: { wishlist: productID }
            }, {
                new: true
            })
            res.json(user)
        }
        else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: { wishlist: productID }
            }, {
                new: true
            })
            res.json(user)
        }
    } catch (error) {

    }
})


const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, productID, comment } = req.body
    try {
        const product = await Product.findById(productID)
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        if (!alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                },
                {
                    new: true,
                }
            );
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: _id,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }
    } catch (error) {

    }
})


const uploadImage = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongo(id)
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "image");
        const url = []
        const files = req.files

        for (const file of files) {
            const {path} = file
            const newpath = uploader(path)
            console.log(newpath)
            url.push(newpath)
        }

        const findProduct = await Product.findByIdAndUpdate(id, {
            images: url.map((file) => {
                return file
            })
        },{
            new: true
        })
        
        res.json(findProduct)

    } catch (error) {
        
    }

})

module.exports = { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImage}