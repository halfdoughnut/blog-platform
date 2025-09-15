const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [10000, 'Content cannot be more than 10000 characters']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot be more than 30 characters']
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ tags: 1 });

// Virtual for formatted creation date
PostSchema.virtual('createdAtFormatted').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Ensure virtual fields are serialized
PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema);
