const express = require('express');  //import express
const helmet = require('helmet');    //import helmet to add security to headers

const postRouter = require('../data/postRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

server.get('/', (req, res) => {
    res.status(200).json({ testMessage: process.env.TEST })
})

server.use('/api/posts', postRouter);

function logger(req, res, next){
    const time = new Date().toISOString();
    console.log(`A ${req.method} was made to ${req.url} at ${time}`)
    next();
}

module.exports = server;