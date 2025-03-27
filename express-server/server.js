const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const initializeDatabase = require('./mongo-init');
const registerRouter = require('./endpoints/register');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello from Express + MongoDB!');
});
app.use('/api', registerRouter);



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

