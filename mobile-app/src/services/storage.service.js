import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Save token to AsyncStorage
 */
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    return true;
  } catch (error) {
    console.error('Save token error:', error);
    return false;
  }
};

/**
 * Get token from AsyncStorage
 */
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    return token;
  } catch (error) {
    console.error('Get token error:', error);
    return null;
  }
};

/**
 * Remove token from AsyncStorage
 */
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    return true;
  } catch (error) {
    console.error('Remove token error:', error);
    return false;
  }
};

/**
 * Save user data to AsyncStorage
 */
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Save user error:', error);
    return false;
  }
};

/**
 * Get user data from AsyncStorage
 */
export const getUser = async () => {
  try {
    const userString = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

/**
 * Remove user data from AsyncStorage
 */
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  } catch (error) {
    console.error('Remove user error:', error);
    return false;
  }
};

/**
 * Clear all storage
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
    return true;
  } catch (error) {
    console.error('Clear storage error:', error);
    return false;
  }
};
