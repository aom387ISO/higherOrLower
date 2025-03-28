const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    bestMangaScore: { type: Number, required: true },
    bestAnimeScore: { type: Number, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Score', ScoreSchema);