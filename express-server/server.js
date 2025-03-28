const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const initializeDatabase = require('./mongo-init');
const registerRouter = require('./endpoints/register');
const loginRouter = require('./endpoints/login');
const changeIconRouter = require('./endpoints/changeIcon');
const changePasswordRouter = require('./endpoints/changePassword');
const updateMangaScoreRouter = require('./endpoints/updateMangaScore');
const updateAnimeScoreRouter = require('./endpoints/updateAnimeScore');
const getUserScoreRouter = require('./endpoints/getUserScore');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
    additionalHeaders: ['Accept', 'Access-Control-Allow-Origin', 'Referer', 'User-Agent'] // should contain list of request headers
}));

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello from Express + MongoDB!');
});

app.use('/api', registerRouter);
app.use('/api', loginRouter);
app.use('/api', changeIconRouter);
app.use('/api', updateMangaScoreRouter);
app.use('/api', updateAnimeScoreRouter);
app.use('/api', getUserScoreRouter);
app.use('/api', changePasswordRouter);

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Servidor Express corriendo en el puerto ${PORT}`);
        });
    } catch (err) {
        console.error('Error al iniciar el servidor:', err);
        process.exit(1);
    }
}

startServer();

