const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { validateMongo } = require('../ultis/validateMongodb')
const cloudinaryUploadImg = require('../ultis/cloundinary')


const createBlog = asyncHandler(async (req, res) => {
    try {
        const createBlog = await Blog.create(req.body)
        console.log(createBlog);
        res.json(createBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const getAblog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongo(id)
    try {
        const blog = await Blog.findById(id).populate("likes")
        res.json(blog)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const AllBlog = await Blog.find()
        res.json(AllBlog)
    } catch (error) {
        throw new Error(error)
    }
})


const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id, req.body, {
            new: true,
        });
        res.json(deleteBlog);
    } catch (error) {
        throw new Error(error);
    }
});



const likeTheBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongo(id);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(id);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { dislikes: loginUserId },
                isDisliked: false,
            },
            { new: true }
        );
        res.json(blog);
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $push: { likes: loginUserId },
                isLiked: true,
            },
            { new: true }
        );
        res.json(blog);
    }
});
const dislikeTheBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongo(id);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(id);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        res.json(blog);
    }
    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { dislikes: loginUserId },
                isDisliked: false,
            },
            { new: true }
        );
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $push: { dislikes: loginUserId },
                isDisliked: true,
            },
            { new: true }
        );
        res.json(blog);
    }
});


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

        const findblog = await Blog.findByIdAndUpdate(id, {
            images: url.map((file) => {
                return file
            })
        },{
            new: true
        })
        
        res.json(findblog)

    } catch (error) {
        
    }

})



module.exports = { createBlog, updateBlog, getAblog, getAllBlog, deleteBlog, likeTheBlog, dislikeTheBlog, uploadImage }