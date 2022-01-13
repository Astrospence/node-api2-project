// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

router.get('/', (req, res) => {
    Posts.find()
    .then(resp => {
        if (!resp) {
            res.status(500).json({ message: 'The posts information could not be retrieved'})
        } else {
            res.status(200).json(resp)
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message})
    })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(resp => {
        if (!resp || resp === null) {
            res.status(404).json({ message: 'The post with the specified ID does not exist'})
        } else {
            res.status(200).json(resp)
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message})
    })
})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
        Posts.insert(req.body)
        .then(resp => {
            console.log(resp)
            res.status(201).json(resp)
        })
        .catch(() => {
            res.status(500).json({ message: 'There was an error while saving the post to the database' })
        })
    }
})

router.put('/:id', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
        Posts.update(req.params.id, req.body)
        .then(resp => {
            if(!resp) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            } else {
                res.status(200).json(resp)
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'The post information could not be modified' })
        })
    }
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(resp => {
        if (!resp) {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else {
            res.status(200).json(resp)
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'The post could not be removed' })
    })
})

module.exports = router