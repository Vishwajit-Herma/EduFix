const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('../models/Profile');
const requireLogin = require("../middlewares/requireLogin");
const path = require('path');
router.use(express.static('files'))

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

// Update or create user profile
router.post('/profile', requireLogin, upload.single('profilePhoto'), async (req, res) => {

  const { role, fullName, enrollment, branch, bio, enrollmentNumber, year } = req.body;
  const userId = req.user._id; // Ensure you're using the ID from the JWT middleware
  const profilePhoto = req.file ? req.file.path : ''; 
  // console.log('File received:', req.file);
  // console.log('Request body:', req.body);// Get file path if uploaded

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { role, fullName, enrollment, branch, bio, enrollmentNumber, year, profilePhoto },
      { new: true, upsert: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); 
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get user profile by ID
router.get('/profile/:userId',async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (user) {
      res.json({
        ...user._doc,
        profilePhoto: user.profilePhoto ? `http://localhost:8000/${user.profilePhoto}` : null,
        
      });
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
