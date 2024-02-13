const express = require('express');
const route = express.Router();
const {createUser, loginUserCtrl, getAllUser, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout} = require('../controller/userCtrl')
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')

route.post("/register", createUser)
route.post("/login", loginUserCtrl)
route.get("/allusers", getAllUser)
route.get("/:id", authMiddleware, isAdmin, getSingleUser)
route.delete("/:id", deleteUser)
route.put("/updateuser", authMiddleware, updateUser)
route.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
route.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser)
route.get("/refresh", handleRefreshToken)
route.get("/logout", logout)



module.exports = route