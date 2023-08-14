require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const morgan = require('morgan');
const app = express();

const mongoServer = require('./config/db.config');

//Middleware
app.use(express.json());
app.use(morgan('dev'));

//Routes
const routes = require('./config/routes.config');
app.use('/api', routes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found!' });
});

//Error handling
app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError)
        return res.status(400).json(err.errors);

    res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port,
        async () => {
            await mongoServer.connectDB();
        }
    );
    console.log(`Server running on port ${port}`);
}
else {
    module.exports = app;
}