const Post = require('../models/post.model');

// Create and Save a new Post
module.exports.create = (req, res, next) => {
    Post.create({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        image: req.body.image,
    }).then(post => {
        res.status(201).json(post);
    }).catch(next);
}

// Retrieve and return all posts from the database.
module.exports.findAll = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(next);
}

// Find a single post with a postId
module.exports.findOne = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            }
            else {
                res.json(post);
            }
        }).catch(next);
}

// Update a post identified by the postId in the request
module.exports.update = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            }
            else {
                res.json(post);
            }
        }).catch(next);
}

// Delete a post with the specified postId in the request
module.exports.delete = (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            }
            else {
                res.status(204).json();
            }
        }).catch(next);

}


