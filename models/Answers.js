// models/Answer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
  answerText: { type: String, required: true },
  answerImage: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'collections', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', answerSchema);
