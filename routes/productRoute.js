const express = require('express');
const route = express.Router();
const {createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct} = require('../controller/productCtrl')
const {isAdmin, authMiddleware} = require('../middleware/authMiddleware')

route.post("/create-product", authMiddleware, isAdmin, createProduct)
route.get("/:id", isAdmin, getSingleProduct)
route.get("/get-all-product", isAdmin, getAllProduct)
route.put("/:id", authMiddleware, isAdmin, updateProduct)
route.delete('/:id', authMiddleware, isAdmin, deleteProduct)

module.exports = route