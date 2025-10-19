import React, { createContext, useState, useEffect, useContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getToken, clearStorage } from '../services/storage.service';
import { loginWithGoogle } from '../services/auth.service';
import GOOGLE_CONFIG from '../config/google.config';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Configure Google Sign-In with Expo
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_CONFIG.ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_CONFIG.IOS_CLIENT_ID,
    webClientId: GOOGLE_CONFIG.WEB_CLIENT_ID,
    expoClientId: GOOGLE_CONFIG.EXPO_CLIENT_ID,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleResponse(authentication);
    }
  }, [response]);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleResponse = async (authentication) => {
    try {
      if (!authentication?.idToken) {
        throw new Error('No ID token received from Google');
      }

      // Send the ID token to your backend for verification
      const response = await loginWithGoogle(authentication.idToken);
      
      // Update auth state
      if (response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      throw new Error(error.message || 'Failed to authenticate with Google');
    }
  };

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signInWithGoogle = async () => {
    try {
      // Trigger Google Sign-In
      const result = await promptAsync();
      
      if (result?.type === 'cancel') {
        throw new Error('Sign in was cancelled');
      }
      
      // The response will be handled by the useEffect hook above
      return result;
    } catch (error) {
      console.error('Google Sign-In error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  const signOut = async () => {
    try {
      // Clear local storage
      await clearStorage();
      
      // Update state
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if sign out fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signInWithGoogle,
        signOut,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
