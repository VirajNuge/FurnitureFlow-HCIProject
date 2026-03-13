const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, default: 'My Room' },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  height: { type: Number, required: true },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
