const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Score = require('../models/Score');

router.put('/updateAnimeScore', async (req, res) => {
    try {
        const { username, score } = req.body;

        if (!username || score === undefined || typeof score !== 'number' || score < 0) {
            return res.status(400).json({ message: 'Faltan datos: username y score son obligatorios' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const existingScore = await Score.findOne({ idUser: user._id });

        if (existingScore) {
           if (score > existingScore.bestAnimeScore) {
                existingScore.bestAnimeScore = score;
                await existingScore.save();
                return res.status(200).json({
                    message: 'Puntuación actualizada exitosamente',
                    score: existingScore
                });
            } else {
                return res.status(200).json({
                    message: 'La nueva puntuación no supera la mejor puntuación existente',
                    score: existingScore
                });
            }
        } else {
            const newScore = new Score({
                idUser: user._id,
                bestMangaScore: 0,
                bestAnimeScore: score
            });
            await newScore.save();
            return res.status(201).json({
                message: 'Puntuación creada exitosamente',
                score: newScore
            });
        }
    } catch (error) {
        console.error('Error al actualizar puntuación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
        
    }
});

module.exports = router;