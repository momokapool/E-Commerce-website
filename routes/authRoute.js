const express = require('express');
const route = express.Router();
const {createUser, loginUserCtrl, getAllUser, getSingleUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, loginAdminCtrl, getWishlist, saveAddress, getUserCart, emptyCart} = require('../controller/userCtrl')
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware')

route.post("/register", createUser)
route.post("/login", loginUserCtrl)
route.post("/admin-login", loginAdminCtrl)

route.get("/logout", logout)
route.get("/allusers", getAllUser)
route.get("/get-wish-list", authMiddleware, getWishlist)
route.get("/get-user-cart", authMiddleware, getUserCart)

route.delete("/:id", deleteUser)
route.delete("/empty-user-cart", authMiddleware, emptyCart)


route.get("/refresh", handleRefreshToken)
route.get("/:id", authMiddleware, isAdmin, getSingleUser)

route.put("/updateuser", authMiddleware, updateUser)
route.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
route.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser)
route.put("/password", authMiddleware, updatePassword)
route.put("/save-address", authMiddleware, saveAddress)



module.exports = route