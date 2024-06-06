require('dotenv').config();

const express=require("express")
const mongoose =require("mongoose")

const app=express(); 
const PORT =process.env.PORT || 5000;
const path = require('path');
mongoose.connect("mongodb://localhost:27017/ChatBiz") 

const userRoute =require("./routes/userRoutes.js") 

const cors = require('cors');

app.use(express.urlencoded({extended:false})) 
app.use(cors());
app.use(express.static("public"))
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//multer


const User = require("./models/userModel.js")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads/profilePics',
    filename: function(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('profilePic');
app.post('/uploadProfilePic', async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err);
      }
  
      if (req.file === undefined) {
        return res.status(400).send('No file selected');
      }
  
    //   console.log('File uploaded:', req.file);
    //   console.log('User ID:', req.body.userId);
  
      try {
        const user = await User.findByIdAndUpdate(
          req.body.userId,
          { profilePic: `/uploads/profilePics/${req.file.filename}` },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).send('User not found');
        }
  
        res.status(200).send(user);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send(error);
      }
    });
  });


//

app.use("/user",userRoute);


app.listen(PORT,()=>{
    console.log("server running on PORT "+PORT);
})

// wb3KwSRxw52UaP9j