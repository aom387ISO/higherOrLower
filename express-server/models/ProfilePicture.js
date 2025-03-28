const mongoose = require('mongoose');

const ProfilePictureSchema = new mongoose.Schema({
    picture: { type: String, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('ProfilePicture', ProfilePictureSchema);