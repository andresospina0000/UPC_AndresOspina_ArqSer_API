require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./config/routes.config');
app.use('/api', routes);

const port = process.env.PORT || 8000;

app.listen(port,
    () => console.info(`Server running on port ${port}`)
);