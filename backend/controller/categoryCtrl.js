const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async(req, res) => {
    try {
        const cate = await Category.create(req.body)
        res.json(cate)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const updateCate = await Category.findByIdAndUpdate(id, req.body, {
            new: true
        })  
        res.json(updateCate)
    } catch (error) {
        throw new Error(error)
    }
})

const getACategory = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const cate = await Category.findById(id)
        res.json(cate)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCategory = asyncHandler(async(req, res) => {
    try {
        const Allcate = await Category.find()
        res.json(Allcate)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const deleteCate = await Category.findByIdAndDelete(id, {
            new: true
        })  
        res.json(deleteCate)
    } catch (error) {
        throw new Error(error)
    }
})







module.exports = {createCategory, updateCategory, getACategory, getAllCategory, deleteCategory}