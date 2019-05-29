const router = require('express').Router();

const Posts = require('../data/db.js');

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents){
        res.status(400).json({ message: 'Please provide title and contents for the post.' })
    }
    Posts.insert({ title, contents }).then( newPost => {
        res.status(201).json(newPost);
    }).catch(error => {
        res.status(500).json({ error: 'There was an error while saving the post to the database.' })
    })
})

router.get('/', (req, res) => {
    Posts.find().then( post => {
        res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id).then(post => {
        if(id === 0){ //logic on this line isn't working
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            return res.status(200).json(post)
        }
    }).catch(error => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id).then(deleted => {
        if(!deleted){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(204).end();
        }
    }).catch(error => {
        res.status(500).json({ error: 'The post could not be removed.' })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const { title, contents } = req.body;

    if (!title || !contents){
        return res.status(400).json({ message: "Please provide title and contents for the post." })
    }

    Posts.update(id, changes).then(updated => {
        if(!updated){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(updated)
        }
    }).catch(error => {
        res.status(500).json({ error: 'The post information could not be modified.' })
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    
    Posts.findPostComments(id).then(comments => {
        if(!comments){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(comments)
        }
    }).catch(error => {
        res.status(500).json({ error: 'The comments information could not be retrieved.' })
    })
})

router.post('/:id/comments', (req, res) => {
    const { text } = req.body;

    Posts.insertComment({ text }).then( commentText => {
        res.status(200).json(commentText);
    } ).catch(error => {
        res.status(500).json({ error: 'The comments information could not be retrieved.' })
    })
})

module.exports = router;
