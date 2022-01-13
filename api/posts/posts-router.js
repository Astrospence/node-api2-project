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

module.exports = router