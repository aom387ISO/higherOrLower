const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Score = require('../models/Score');

router.get('/getUserScore', async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userScore = await Score.findOne({ idUser: user._id });
        if (!userScore) {
            return res.status(200).json({
                message: 'No se encontraron puntuaciones para este usuario. Se devuelven valores predeterminados.',
                scores: {
                    bestMangaScore: 0,
                    bestAnimeScore: 0
                }
            });
        }

        res.status(200).json({
            message: 'Puntuaciones obtenidas exitosamente',
            scores: {
                bestMangaScore: userScore.bestMangaScore,
                bestAnimeScore: userScore.bestAnimeScore
            }
        });
    } catch (error) {
        console.error('Error al obtener las puntuaciones del usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;