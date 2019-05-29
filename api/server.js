const express = require('express'); //import express

const postRouter = require('../data/postRouter.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Yo dawg')
})

server.use('/api/posts', postRouter);

module.exports = server;