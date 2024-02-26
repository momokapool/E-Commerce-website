const express = require('express')
const route = express.Router()
const {createBlog, updateBlog, getAblog, getAllBlog, deleteBlog, likeTheBlog, dislikeTheBlog} = require ('../controller/blogCtrl')
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')



route.post('/create-blog', createBlog)
route.put('/:id', authMiddleware, isAdmin, updateBlog)
route.get('/:id', getAblog)
route.get('/all-blog', getAllBlog)
route.delete('/:id', authMiddleware, isAdmin, deleteBlog)
route.put('/likes/:id', authMiddleware, likeTheBlog)
route.put('/dislikes/:id', authMiddleware, dislikeTheBlog)










module.exports = route