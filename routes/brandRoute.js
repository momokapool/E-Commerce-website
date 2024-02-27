const express = require('express')
const route = express.Router()

const {createBrand, updateBrand, getABrand, getAllBrand, deleteBrand} = require('../controller/brandCtrl')
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')

route.get('/all-brand', authMiddleware, isAdmin, getAllBrand)
route.post('/create-brand', authMiddleware, isAdmin, createBrand)
route.put('/:id', authMiddleware, isAdmin, updateBrand)
route.get('/:id', authMiddleware, isAdmin, getABrand)
route.delete('/:id', authMiddleware, isAdmin, deleteBrand)

module.exports = route