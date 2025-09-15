const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts by logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get posts by current user
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email');

    // Get total count for pagination
    const total = await Post.countDocuments({ author: req.user._id });

    res.json({
      posts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      message: 'Server error fetching posts',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id // Ensure user can only access their own posts
    }).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({
        message: 'Post not found or you do not have permission to view it'
      });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({
      message: 'Server error fetching post',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required'
      });
    }

    // Process tags - split by comma and clean up
    let processedTags = [];
    if (tags) {
      if (Array.isArray(tags)) {
        processedTags = tags;
      } else if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
    }

    // Create new post
    const post = new Post({
      title,
      content,
      tags: processedTags,
      author: req.user._id
    });

    await post.save();
    
    // Populate author info before sending response
    await post.populate('author', 'name email');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      message: 'Server error creating post',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required'
      });
    }

    // Process tags
    let processedTags = [];
    if (tags) {
      if (Array.isArray(tags)) {
        processedTags = tags;
      } else if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
    }

    // Find and update post (only if user owns it)
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { title, content, tags: processedTags },
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({
        message: 'Post not found or you do not have permission to update it'
      });
    }

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({
      message: 'Server error updating post',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find and delete post (only if user owns it)
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found or you do not have permission to delete it'
      });
    }

    res.json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({
      message: 'Server error deleting post',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;
