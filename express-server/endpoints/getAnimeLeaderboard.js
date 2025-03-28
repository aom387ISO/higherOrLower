const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const ProfilePicture = require('../models/ProfilePicture');

router.get('/getAnimeLeaderboard', async (req, res) => {
    try {
        const leaderboard = await Score.find()
            .sort({ bestAnimeScore: -1 })
            .limit(5)
            .populate('idUser', 'username');

        const leaderboardWithPictures = await Promise.all(
            leaderboard.map(async (entry, index) => {
                const profilePicture = await ProfilePicture.findOne({ idUser: entry.idUser._id });
                return {
                    position: index + 1,
                    username: entry.idUser.username,
                    score: entry.bestAnimeScore,
                    profileImage: profilePicture ? `assets/profilePictures/${profilePicture.picture}` : `assets/profilePictures/profile_1.png`
                };
            })
        );
        
        res.status(200).json({
            message: 'Leaderboard de anime obtenido exitosamente',
            leaderboard: leaderboardWithPictures
        });
    } catch (error) {
        console.error('Error al obtener el leaderboard de anime:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;