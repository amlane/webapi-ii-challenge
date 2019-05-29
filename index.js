const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Yo dawg')
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents){
        res.status(400).json({ message: 'Please provide title and contents for the post.' })
    }
    db.insert({ title, contents }).then( newPost => {
        res.status(201).json(newPost);
    }).catch(error => {
        res.status(500).json({ message: 'There was an error while saving the post to the database.' })
    })
})

server.get('/api/posts', (req, res) => {
    db.find().then( post => {
        res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ message: 'The posts information could not be retrieved.' })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(post => {
        if(id === 0){ //logic on this line isn't working
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            return res.status(200).json(post)
        }
    }).catch(error => {
        res.status(500).json({ message: 'The posts information could not be retrieved.' })
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(deleted => {
        if(!deleted){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(204).end();
        }
    }).catch(error => {
        res.status(500).json({ message: 'The post could not be removed.' })
    })
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const { title, contents } = req.body;

    db.update(id, changes).then(updated => {
        if(!updated){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if (!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post." })
        } else {
            res.status(200).json(updated)
        }
    }).catch(error => {
        res.status(500).json({ message: 'The post could not be updated.' })
    })
})


server.listen(5000, () => {
    console.log('** API is running on port 5k **')
})