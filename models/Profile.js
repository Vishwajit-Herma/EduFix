const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'collections', required: true },
  role: { type: String, enum: ['Student', 'Faculty'], required: true },
  fullName: { type: String, required: true },
  profilePhoto: { type: String }, // URL or file path
  email: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  bio: { type: String },
  // For students only
  enrollmentNumber: { type: String },
  year: { type: String },

});

const Profile = mongoose.model('Profile', userSchema);
module.exports = Profile
