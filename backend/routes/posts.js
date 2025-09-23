const express = require('express');
const PostService = require('../services/postService');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts by logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get posts by current user
    const posts = await PostService.getPostsByAuthor(req.user.id, limit, offset);

    // Get total count for pagination (for this user's posts)
    const allUserPosts = await PostService.getPostsByAuthor(req.user.id, 1000, 0); // Get all posts to count
    const total = allUserPosts.length;

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
    const post = await PostService.getPostById(req.params.id);

    // Ensure user can only access their own posts
    if (!post || post.author_id !== req.user.id) {
      return res.status(404).json({
        message: 'Post not found or you do not have permission to view it'
      });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
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

    // Create new post using PostService
    const post = await PostService.createPost({
      title,
      content,
      tags: processedTags,
      author_id: req.user.id
    });

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

    // First check if post exists and user owns it
    const existingPost = await PostService.getPostById(req.params.id);
    if (!existingPost || existingPost.author_id !== req.user.id) {
      return res.status(404).json({
        message: 'Post not found or you do not have permission to update it'
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

    // Update post using PostService
    const post = await PostService.updatePost(req.params.id, {
      title,
      content,
      tags: processedTags
    });

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
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
    // First check if post exists and user owns it
    const existingPost = await PostService.getPostById(req.params.id);
    if (!existingPost || existingPost.author_id !== req.user.id) {
      return res.status(404).json({
        message: 'Post not found or you do not have permission to delete it'
      });
    }

    // Delete post using PostService
    await PostService.deletePost(req.params.id);

    res.json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      message: 'Server error deleting post',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;
