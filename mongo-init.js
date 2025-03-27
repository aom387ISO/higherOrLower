const mongoose = require('mongoose');
const User = require('./express-server/models/User');
const ProfilePicture = require('./express-server/models/ProfilePicture');
const Score = require('./express-server/models/Score');

async function initializeDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');

        const userCount = await User.countDocuments();
        if (userCount === 0) {
            const newUser = new User({
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedpassword',
            });
            await newUser.save();
            console.log('Usuario inicial creado');

            const newProfilePicture = new ProfilePicture({
                picture: './angular-app/public/assets/ProfilePictures/profile_1.png',
                idUser: newUser._id,
            });
            await newProfilePicture.save();

            const newScore = new Score({
                bestMangaScore: 0,
                bestAnimeScore: 0,
                idUser: newUser._id,
            });
            await newScore.save();
        }
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}

module.exports = initializeDatabase;