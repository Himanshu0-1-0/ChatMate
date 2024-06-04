require('dotenv').config();

const express=require("express")
const mongoose =require("mongoose")

const app=express(); 
const PORT =process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/ChatBiz") 

const userRoute =require("./routes/userRoutes.js") 

const cors = require('cors');

app.use(express.urlencoded({extended:false})) 
app.use(cors());
app.use(express.static("public"))
app.use(express.json());



app.use("/user",userRoute);


app.listen(PORT,()=>{
    console.log("server running on PORT "+PORT);
})

// wb3KwSRxw52UaP9j