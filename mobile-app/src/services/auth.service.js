import api from './api';
import { saveToken, saveUser, clearStorage } from './storage.service';

/**
 * Register new user
 */
export const register = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify OTP
 */
export const verifyOTP = async (email, otp) => {
  try {
    const response = await api.post('/auth/verify-otp', {
      email,
      otp,
    });
    
    // Save token and user data
    if (response.data?.token) {
      await saveToken(response.data.token);
      await saveUser(response.data.user);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Resend OTP
 */
export const resendOTP = async (email, purpose = 'signup') => {
  try {
    const response = await api.post('/auth/resend-otp', {
      email,
      purpose,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    
    // Save token and user data
    if (response.data?.token) {
      await saveToken(response.data.token);
      await saveUser(response.data.user);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Login with Google
 */
export const loginWithGoogle = async (idToken) => {
  try {
    const response = await api.post('/auth/google', {
      idToken,
    });
    
    // Save token and user data
    if (response.data?.token) {
      await saveToken(response.data.token);
      await saveUser(response.data.user);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Forgot password - request OTP
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Reset password with OTP
 */
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    await clearStorage();
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

/**
 * Get user profile
 */
export const getProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    
    // Update stored user data
    if (response.data?.user) {
      await saveUser(response.data.user);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (name, profilePicture) => {
  try {
    const response = await api.put('/user/profile', {
      name,
      profilePicture,
    });
    
    // Update stored user data
    if (response.data?.user) {
      await saveUser(response.data.user);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get user statistics
 */
export const getUserStats = async () => {
  try {
    const response = await api.get('/user/stats');
    return response;
  } catch (error) {
    throw error;
  }
};
