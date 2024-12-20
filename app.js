const express = require("express");
const collections = require("./models/mongo");
const cors = require("cors");
const bodyParser=require('body-parser');
const app = express();
const mongoose = require("mongoose");
const path = require("path")
app.use('/files', express.static(path.join(__dirname, 'files')));
require('dotenv').config(); 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(require("./routes/signin"))
app.use(require("./routes/post"))
app.use(require("./routes/profileRoute"))
app.use(require("./routes/Answers"))

app.get("/",cors(),(req,res)=>{

})









app.listen(8000,()=>{
    console.log("port connected");
})

