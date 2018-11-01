const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./src/routes/users');
const postRouter = require('./src/routes/posts');
const app = express();

mongoose.connect('mongodb://localhost/user_service',{ useNewUrlParser: true });

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH ,PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/api/users', router);
app.use('/api/posts', postRouter);
module.exports = app;