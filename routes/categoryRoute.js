const express = require('express')
const route = express.Router()

const {createCategory, updateCategory, getACategory, getAllCategory, deleteCategory} = require('../controller/categoryCtrl')
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')

route.post('/create-category', authMiddleware, isAdmin, createCategory)
route.put('/:id', authMiddleware, isAdmin, updateCategory)
route.get('/:id', authMiddleware, isAdmin, getACategory)
route.get('/all-category', authMiddleware, isAdmin, getAllCategory)
route.delete('/:id', authMiddleware, isAdmin, deleteCategory)

module.exports = route