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



module.exports = router