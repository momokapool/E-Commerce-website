const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async(req, res) => {
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


const getSingleProduct = asyncHandler(async(req, res) =>{
    const {id} = req.params
    try {
        const findproduct = await Product.findById(id)
        console.log(findproduct)
    } catch (error) {
        throw new Error(error)
    }
})


const getAllProduct = asyncHandler(async(req, res) =>{
    try {
        const findAllproduct = await Product.find()
        res.json(findAllproduct)
    } catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async(req, res) =>{
    const {id} = req.params
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await Product.findByIdAndUpdate({id}, req.body ,{
            new: true
        })
        console.log(updateProduct);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async(req, res) =>{
    const {id} = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
    res.json(deleteProduct) 
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct}