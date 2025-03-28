const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ProfilePicture = require('../models/ProfilePicture');
//const bcrypt = require('bcrypt');

// POST /api/register - Registro de usuario
router.post('/register', async (req, res) => {
    try {
        console.log('POST /api/register');
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'El nombre de usuario o email ya está en uso' 
            });
        }
        console.log('Registrando usuario:', username, email, password);
        /*
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        */
       console.log("Creando usuario")
        const newUser = new User({
            username,
            email,
            password: password
        });
        console.log("Usuario creado")
        const savedUser = await newUser.save();
        console.log("Se ha hecho el save")
        
        const newPicture = new ProfilePicture({
            picture: 'profile_1.png',
            idUser: savedUser._id
        });

        const savedProfilePicture = await newPicture.save();
        console.log('Imagen de perfil guardada en la base de datos:', savedProfilePicture);

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            user: { username, email, profilePicture: newPicture.picture }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;