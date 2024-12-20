const express = require("express");
const collections = require("../models/mongo");
const router = express.Router();
const multer  = require('multer');
const mongoose = require("mongoose");
const path = require("path");
const UserModel=require("../models/Users");
const authenticateJWT = require("../middlewares/jwt")
router.use(express.static('files'))
require('dotenv').config(); 
const requireLogin = require("../middlewares/requireLogin");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files')
    },
    filename: (req, file, cb) =>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
// POST: Upload a new post

router.post('/upload',requireLogin, upload.single('file') , async (req, res) => {
    try {
        const title = req.body.title;
        const text = req.body.text;

        const user = req.user;  // req.user should be populated by the middleware

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = user._id;  // Get the logged-in user's ID

        // Create a new post with the logged-in user's ID in postedBy
        const newPost = new UserModel({
            image: req.file.filename,  // Save file name
            title: title,
            text: text,
            postedBy: userId  // Reference to logged-in User ID
        });

        const result = await newPost.save();
        return res.json(result);  // Send saved post as response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating post' });
    }
});


// GET: Fetch posts and populate the postedBy field with the user's name
router.get('/getPost', async (req, res) => {
    try {
        const posts = await UserModel.find()
            .populate('postedBy', '_id fullName profilePhoto role')  // Populate postedBy with the user's name
            
        
        res.json(posts);  // Return populated posts
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

router.post('/posts/:id/like', async (req, res) => {
    try {
      const post = await UserModel.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.likes += 1;
      await post.save();
  
      res.json({ likes: post.likes });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

module.exports = router;