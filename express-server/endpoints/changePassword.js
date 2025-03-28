const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.put('/changePassword', async (req, res) => {
    try {
        const { username, currentPassword, newPassword } = req.body;

        if (!username || !currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Faltan datos: username, currentPassword y newPassword son obligatorios.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (user.password !== currentPassword) {
            return res.status(400).json({ message: 'La contraseña actual es incorrecta.' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

module.exports = router;