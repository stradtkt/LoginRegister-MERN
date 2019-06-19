const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.send('API Running');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/feed', require('./routes/api/feed'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});