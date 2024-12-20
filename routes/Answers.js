// routes/answerRoutes.js
const express = require('express');
const router = express.Router();
const Answer = require('../models/Answers');
const Profile = require('../models/Profile')
const  isAuthenticated  = require('../middlewares/requireLogin');
const path = require('path');
router.use(express.static('files'))
const multer  = require('multer');
const mongoose = require('mongoose')

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
// const { _id } = payload
// profile=Profile.findById(_id).then(userData => {
//   req.user = userData
//   next()
// })
// Or configure as per your needs

// Route to handle file upload and form data
router.post('/answer',isAuthenticated, upload.single('answerImage'), async (req, res) => {
  try {
    // console.log('req.body:', req.body); // Log the request body
    // console.log('req.file:', req.file);
    // Log the uploaded file
   
    const { answerText, postId } = req.body;
  
    
    if (!answerText || !postId) {
      return res.status(400).json({ message: 'Answer text and postId are required.' });
    }
 


    const answerImage = req.file ? req.file.filename : null;

    const answer = new Answer({
      answerText,
      answerImage,
      postedBy: req.user._id,
      postId
    });

    await answer.save();
    res.status(201).json({ message: 'Answer posted successfully', answer });
  } catch (error) {
    console.error('Error posting answer:', error);
    res.status(500).json({ message: 'Error posting answer', error });
  }
});

router.get('/getanswers/:postId', async (req, res) => {
 
    try {
      const answers = await Answer.find({postId: req.params.postId})
        .populate('postedBy', 'fullName role profilePhoto') // Populating 'name' and 'role' from Profile
        
      console.log(answers);
      res.json(answers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching answers', error });
    }
 
});
module.exports = router;
