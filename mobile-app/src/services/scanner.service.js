import api from './api';
import axios from 'axios';
import { TIMEOUTS } from '../utils/constants';

/**
 * Analyze food image
 */
export const analyzeFood = async (imageBase64) => {
  try {
    // Create a new axios instance with longer timeout for image analysis
    const analysisApi = axios.create({
      ...api.defaults,
      timeout: TIMEOUTS.IMAGE_ANALYSIS,
    });
    
    // Copy interceptors from main api
    analysisApi.interceptors.request = api.interceptors.request;
    analysisApi.interceptors.response = api.interceptors.response;
    
    const response = await analysisApi.post('/scanner/analyze', {
      imageBase64,
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get analysis history
 */
export const getHistory = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(`/scanner/history?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get analysis by ID
 */
export const getAnalysisById = async (id) => {
  try {
    const response = await api.get(`/scanner/analysis/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete analysis
 */
export const deleteAnalysis = async (id) => {
  try {
    const response = await api.delete(`/scanner/analysis/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Search history
 */
export const searchHistory = async (query) => {
  try {
    const response = await api.get(`/scanner/search?query=${encodeURIComponent(query)}`);
    return response;
  } catch (error) {
    throw error;
  }
};
