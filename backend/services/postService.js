const { supabaseAdmin } = require('../config/supabase');

class PostService {
  // Create a new post
  static async createPost(postData) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert({
        title: postData.title,
        content: postData.content,
        tags: postData.tags || [],
        author_id: postData.author_id
      })
      .select(`
        *,
        users:author_id (
          id,
          name,
          email
        )
      `)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get all posts with pagination
  static async getAllPosts(limit = 10, offset = 0) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:author_id (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get post by ID
  static async getPostById(postId) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:author_id (
          id,
          name,
          email
        )
      `)
      .eq('id', postId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get posts by author
  static async getPostsByAuthor(authorId, limit = 10, offset = 0) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:author_id (
          id,
          name,
          email
        )
      `)
      .eq('author_id', authorId)
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Update post
  static async updatePost(postId, updateData) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .update({
        title: updateData.title,
        content: updateData.content,
        tags: updateData.tags,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .select(`
        *,
        users:author_id (
          id,
          name,
          email
        )
      `)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Delete post
  static async deletePost(postId) {
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  }

  // Search posts by title or content
  static async searchPosts(searchTerm, limit = 10, offset = 0) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:author_id (
          id,
          name,
          email
        )
      `)
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get posts by tags
  static async getPostsByTags(tags, limit = 10, offset = 0) {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:author_id (
          id,
          name,
          email
        )
      `)
      .overlaps('tags', tags)
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get post count for pagination
  static async getPostCount() {
    const { count, error } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw new Error(error.message);
    }

    return count;
  }
}

module.exports = PostService;
