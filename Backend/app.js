require('dotenv').config();

const express=require("express")
const mongoose =require("mongoose")
const { createServer } = require("http");
const { initializeSocket } = require('./socket');

// const { Server } = require("socket.io");


const app=express(); 
const httpServer = createServer(app);
initializeSocket(httpServer);


const PORT =process.env.PORT || 5000;
const path = require('path');
mongoose.connect("mongodb://localhost:27017/ChatBiz") 

const userRoute =require("./routes/userRoutes.js") 
const chatRoute =require("./routes/chatRoutes.js") 
const msgRoute =require("./routes/msgRoutes.js") 

const cors = require('cors');

app.use(express.urlencoded({extended:false})) 
app.use(cors());
app.use(express.static("public"))
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));







//multer

const User = require("./models/userModel.js");
const Chat = require("./models/chatModel.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
// const { s3, S3_BUCKET } = require('./config');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    // acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `profilePics/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 1500000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

app.post('/uploadProfilePic', authMiddleware, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err); // Log the error
      return res.status(400).send(err);
    }

    if (req.file === undefined) {
      console.log("No file selected");
      return res.status(400).send('No file selected');
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { profilePic: req.file.location }, // Use the location property from S3
        { new: true }
      );

      if (!user) {
        console.log("User not found");
        return res.status(404).send('User not found');
      }

      res.status(200).send(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send(error);
    }
  });
});

app.post('/uploadGroupProfilePic', authMiddleware, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err); // Log the error
      return res.status(400).send(err);
    }

    if (req.file === undefined) {
      console.log("No file selected");
      return res.status(400).send('No file selected');
    }

    try {
      const chat = await Chat.findByIdAndUpdate(
        req.body.chatId,
        { chatProfilePic: req.file.location }, // Use the location property from S3
        { new: true }
      );

      if (!chat) {
        console.log("Chat not found");
        return res.status(404).send('Chat not found');
      }

      res.status(200).send(chat);
    } catch (error) {
      console.error('Error updating chat:', error);
      res.status(500).send(error);
    }
  });
});

//

app.use("/user",userRoute);
app.use("/chat",chatRoute);
app.use("/msg",msgRoute);



httpServer.listen(PORT,()=>{
  console.log("Server Connected")
});
// app.listen(PORT,()=>{
//     console.log("server running on PORT "+PORT);
// })

// wb3KwSRxw52UaP9j