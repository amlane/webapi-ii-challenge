const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json()); 

server.get('/', (req, res) => {
    res.send('Yo dawg')
})

server.listen(5000, (req, res) => {
    console.log('** API is running on port 5k **')
})