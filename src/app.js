const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./routes/main');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', mainRouter);

module.exports = app;
