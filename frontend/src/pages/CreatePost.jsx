import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postsAPI } from '../services/api';
import SmartEditor from '../components/SmartEditor';

const CreatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing post
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load post data for editing
  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const response = await postsAPI.getPost(id);
        const post = response.data.post;
        setFormData({
          title: post.title,
          content: post.content,
          tags: post.tags ? post.tags.join(', ') : ''
        });
      } catch (error) {
        console.error('Load post error:', error);
        setErrors({ general: 'Failed to load post. Please try again.' });
      } finally {
        setLoading(false);
      }
    };
    
    if (isEditing) {
      loadPost();
    }
  }, [isEditing, id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length > 10000) {
      newErrors.content = 'Content must be less than 10,000 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags
      };

      if (isEditing) {
        await postsAPI.updatePost(id, postData);
      } else {
        await postsAPI.createPost(postData);
      }

      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 
        `Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`;
      setErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEditing ? '✏️ Edit Post' : '✍️ Create New Post'}
          </h1>
          <p className="text-gray-300">
            {isEditing ? 'Update your existing blog post' : 'Share your thoughts with the world'}
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {errors.general}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
              Title *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 ${
                errors.title ? 'border-red-500 bg-red-900/20' : 'border-gray-600'
              }`}
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your post title..."
              disabled={isSubmitting}
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title}</p>
              )}
              <p className="text-xs text-gray-500 ml-auto">
                {formData.title.length}/200 characters
              </p>
            </div>
          </div>

          {/* Content with Smart Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <SmartEditor
              initialContent={formData.content}
              draftKey={isEditing ? `edit-post-${id}` : 'create-post'}
              placeholder="Write your amazing blog content here... ✨"
              onContentChange={(content) => {
                setFormData(prev => ({ ...prev, content }));
                // Clear content error when user starts typing
                if (errors.content && content.trim()) {
                  setErrors(prev => ({ ...prev, content: '' }));
                }
              }}
              className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && (
              <p className="text-sm text-red-600 mt-2">{errors.content}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-200 mb-2">
              Tags
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas (e.g., technology, web development, react)"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-600">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-6 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? 'Updating...' : 'Publishing...'}
                </>
              ) : (
                <>
                  {isEditing ? '💾 Update Post' : '🚀 Publish Post'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
