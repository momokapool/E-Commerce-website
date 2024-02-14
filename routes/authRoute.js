const express = require('express');
const route = express.Router();
const {createUser, loginUserCtrl, getAllUser, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout} = require('../controller/userCtrl')
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')

route.post("/register", createUser)
route.post("/login", loginUserCtrl)
route.get("/logout", logout)
route.get("/allusers", getAllUser)
route.delete("/:id", deleteUser)
route.get("/refresh", handleRefreshToken)
route.get("/:id", authMiddleware, isAdmin, getSingleUser)
route.put("/updateuser", authMiddleware, updateUser)
route.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
route.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser)





module.exports = route