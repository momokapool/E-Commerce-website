const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async(req, res) => {
    try {
        const brand = await Brand.create(req.body)
        res.json(brand)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBrand = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true
        })  
        res.json(updateBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getABrand = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const brand = await Brand.findById(id)
        res.json(brand)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBrand = asyncHandler(async(req, res) => {
    try {
        const Allbrand = await Brand.find()
        res.json(Allbrand)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBrand = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id, {
            new: true
        })  
        res.json(deleteBrand)
    } catch (error) {
        throw new Error(error)
    }
})







module.exports = {createBrand, updateBrand, getABrand, getAllBrand, deleteBrand}