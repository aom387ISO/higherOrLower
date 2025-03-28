const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ProfilePicture = require('../models/ProfilePicture');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        console.log('POST /api/login');
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
          }

          const user = await User.findOne({ username });
          if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        
        const profilePicture = await ProfilePicture.findOne({ idUser: user._id });
        console.log('ProfilePicture found:', profilePicture);
        
        res.status(201).json({ 
            message: 'Usuario logueado exitosamente',
            user: { username: user.username, email: user.email, profilePicture: profilePicture ? profilePicture.picture : "profile_1.png" }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;