const express = require('express');
const route = express.Router();
const {createUser, loginUserCtrl} = require('../controller/userCtrl')

route.post("/register", createUser)
route.post("/login", loginUserCtrl)

module.exports = route