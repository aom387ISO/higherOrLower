const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ProfilePicture = require('../models/ProfilePicture');

router.put('/changeIcon', async (req, res) => {
    try {
        console.log('PUT /api/changeIcon');
        const { username, profileImage } = req.body;
        console.log("username: ", username);
        console.log("profileImage: ", profileImage);
        if (!req.body.username || !req.body.profilePicture) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const result = await ProfilePicture.updateOne(
            { idUser: user._id }, // Usar el ID del usuario como filtro
            { picture: profileImage }
        );

        console.log('ProfilePicture update result:', result);
        
        res.status(201).json({ 
            message: 'Usuario actualizado exitosamente',
            user: { username, profileImage}
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;