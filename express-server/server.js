const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Basic API route
app.get('/api', (req, res) => {
    res.send('Hello from Express + MongoDB!');
});

app.listen(PORT, () => {
    console.log();
});

