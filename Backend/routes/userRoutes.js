const express = require('express');
const { registerUser ,loginUser} = require('../controller/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const userRoute = express.Router();

// Registration route
userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

userRoute.get('/protected', authMiddleware,(req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
  });

// const token = localStorage.getItem('token');

// const response = await fetch('http://localhost:5000/protected-route', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTRjYzYzMzIwNzAxYjc2M2UzYTIyNCIsImlhdCI6MTcxNjg5MTk5OSwiZXhwIjoxNzE2ODk1NTk5fQ.5ntfHjs6x9F_Zt8cvh4zTUBq7LChlcS35v0dlYOOqtM`
//   }
// });


module.exports = userRoute;
 