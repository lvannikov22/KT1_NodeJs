const express = require('express');
const lessonRoutes = require('./routes/lessonRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());
app.use('/lessons', lessonRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
