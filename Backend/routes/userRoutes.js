const express = require('express');
const { registerUser ,loginUser,changePassword} = require('../controller/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const userRoute = express.Router();

// Registration route
userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/changePassword',authMiddleware,changePassword)



module.exports = userRoute;
 