const mongoose=require("mongoose")
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/edoubt")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new Schema({
    enrollment:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    likes: { type: [String], default: [] },
  
})

const collections = mongoose.model("collections",newSchema)

module.exports=collections
