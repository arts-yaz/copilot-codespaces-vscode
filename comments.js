// Create web server application to handle the GET and POST requests for comments
// in the database. 

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Comment = require('../models/comment.js');
var User = require('../models/user.js');

// Get all comments
router.get('/', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// Get one comment
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// Create new comment
router.post('/', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

// Update comment
router.put('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    comment.content = req.body.content;
    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    });
  });
});

// Delete comment
router.delete('/:id', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

module.exports = router;