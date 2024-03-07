const express = require('express');
const route = express.Router();
const {createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImage} = require('../controller/productCtrl')
const {isAdmin, authMiddleware} = require('../middleware/authMiddleware')
const {uploadPhoto, productImgResize} = require('../middleware/uploadImage')


route.post("/create-product", authMiddleware, isAdmin, createProduct)
route.get("/:id", isAdmin, getSingleProduct)
route.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImage)
route.get("/get-all-product", isAdmin, getAllProduct)
route.put("/:id", authMiddleware, isAdmin, updateProduct)
route.delete('/:id', authMiddleware, isAdmin, deleteProduct)
route.put("/add-to-wishlist", authMiddleware, addToWishlist)
route.put("/rating", authMiddleware, rating)



module.exports = route