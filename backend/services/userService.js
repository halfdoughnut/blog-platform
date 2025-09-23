const { supabaseAdmin, supabaseAuth } = require('../config/supabase');

class UserService {
  // Create a new user (this is handled by Supabase Auth + trigger)
  static async createUser(userData) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true, // Skip email confirmation
      user_metadata: {
        name: userData.name
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  }

  // Get user by ID
  static async getUserById(userId) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get user by email
  static async getUserByEmail(email) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw new Error(error.message);
    }

    return data;
  }

  // Update user
  static async updateUser(userId, updateData) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Delete user
  static async deleteUser(userId) {
    // Delete from auth (this will cascade to users table)
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  }

  // Sign in user using proper client auth
  static async signInUser(email, password) {
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error('Invalid login credentials');
    }

    return data;
  }

  // Verify JWT token
  static async verifyToken(token) {
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  }
}

module.exports = UserService;
