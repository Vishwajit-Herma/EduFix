const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const UserSchema = new Schema({
    image: String,
    title: String,
    text: String,  
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        
    },
    likes: { type: [String], default: [] },
},{timestamps: true});


const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel