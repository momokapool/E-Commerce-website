const express = require('express')
const route = express.Router()
const {createBlog, updateBlog, getAblog, getAllBlog, deleteBlog, likeTheBlog, dislikeTheBlog, uploadImage} = require ('../controller/blogCtrl')
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')
const {uploadPhoto, blogImgResize} = require('../middleware/uploadImage')


route.post('/create-blog', createBlog)
route.put('/:id', authMiddleware, isAdmin, updateBlog)
route.get('/:id', getAblog)
route.get('/all-blog', getAllBlog)
route.delete('/:id', authMiddleware, isAdmin, deleteBlog)
route.put('/likes/:id', authMiddleware, likeTheBlog)
route.put('/dislikes/:id', authMiddleware, dislikeTheBlog)
route.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), blogImgResize, uploadImage)










module.exports = route