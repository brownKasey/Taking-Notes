const express = require('express');

//importing modular routers for notes
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter)

module.exports = app;

