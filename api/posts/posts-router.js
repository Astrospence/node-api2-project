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
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
        Posts.insert({ title, contents })
        .then(({ id }) => {
            return Posts.findById(id)
        })
        .then(resp => {
            res.status(201).json(resp)
        })
        .catch(() => {
            res.status(500).json({ message: 'There was an error while saving the post to the database' })
        })
    }
})

router.put('/:id', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
        Posts.findById(req.params.id)
        .then(resp => {
            if (!resp) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            } else {
                return Posts.update(req.params.id, req.body)
            }
        })
        .then(resp => {
            if (resp) {
                return Posts.findById(req.params.id)
            }
        })
        .then(resp => {
            if (resp) {
                res.status(200).json(resp)
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'The posts information could not be retrieved' })
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (!post) {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else {
            await Posts.remove(req.params.id)
            res.status(200).json(post)
        }
    } catch (err) {
        res.status(500).json({ message: 'The post could not be removed' })
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (!post) {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else {
            const comments = await Posts.findPostComments(req.params.id)
            res.status(200).json(comments)
        }
    } catch (err) {
        res.status(500).json({ message: 'The comments information could not be retrieved' })
    }
})

module.exports = router