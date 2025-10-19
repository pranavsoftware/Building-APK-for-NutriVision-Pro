import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

/**
 * Request camera permissions
 */
export const requestCameraPermission = async () => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos.',
        [{ text: 'OK' }]
      );
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Camera permission error:', error);
    return false;
  }
};

/**
 * Request gallery permissions
 */
export const requestGalleryPermission = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Gallery permission is required to select photos.',
        [{ text: 'OK' }]
      );
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Gallery permission error:', error);
    return false;
  }
};

/**
 * Take photo from camera
 */
export const takePhoto = async () => {
  const hasPermission = await requestCameraPermission();
  
  if (!hasPermission) {
    return null;
  }
  
  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      return {
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Take photo error:', error);
    Alert.alert('Error', 'Failed to take photo. Please try again.');
    return null;
  }
};

/**
 * Pick image from gallery
 */
export const pickImage = async () => {
  const hasPermission = await requestGalleryPermission();
  
  if (!hasPermission) {
    return null;
  }
  
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      return {
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Pick image error:', error);
    Alert.alert('Error', 'Failed to pick image. Please try again.');
    return null;
  }
};

/**
 * Convert image to base64 data URL
 */
export const imageToBase64DataURL = (base64, mimeType = 'image/jpeg') => {
  return `data:${mimeType};base64,${base64}`;
};

/**
 * Compress image (basic implementation)
 */
export const compressImage = async (uri) => {
  // For production, consider using expo-image-manipulator
  // This is a placeholder
  return uri;
};
