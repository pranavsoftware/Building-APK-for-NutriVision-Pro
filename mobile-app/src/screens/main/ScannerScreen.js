import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { takePhoto, pickImage, imageToBase64DataURL } from '../../utils/imageHelpers';
import { analyzeFood } from '../../services/scanner.service';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const ScannerScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleTakePhoto = async () => {
    const photo = await takePhoto();
    if (photo) {
      setSelectedImage(photo);
    }
  };

  const handlePickImage = async () => {
    const image = await pickImage();
    if (image) {
      setSelectedImage(image);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setAnalyzing(true);
    try {
      const imageData = imageToBase64DataURL(selectedImage.base64);
      const response = await analyzeFood(imageData);
      
      // Navigate to results
      navigation.navigate('ResultDetails', { 
        analysis: response.data.analysis,
        isNewScan: true,
      });
      
      // Reset
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={commonStyles.heading2}>Food Scanner</Text>
          <Text style={commonStyles.bodyText}>
            Take or upload a photo of your food
          </Text>
        </View>

        {/* Image Preview */}
        <Card style={styles.imageContainer}>
          {selectedImage ? (
            <>
              <Image source={{ uri: selectedImage.uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle" size={32} color={colors.error} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="image-outline" size={64} color={colors.textLight} />
              <Text style={styles.placeholderText}>No image selected</Text>
            </View>
          )}
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleTakePhoto}>
            <View style={styles.optionIcon}>
              <Ionicons name="camera" size={32} color={colors.primary} />
            </View>
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handlePickImage}>
            <View style={styles.optionIcon}>
              <Ionicons name="images" size={32} color={colors.secondary} />
            </View>
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Analyze Button */}
        {selectedImage && (
          <Button
            title={analyzing ? 'Analyzing...' : 'Analyze Food'}
            onPress={handleAnalyze}
            loading={analyzing}
            icon={<Ionicons name="scan" size={24} color={colors.white} />}
          />
        )}

        {analyzing && (
          <View style={styles.analyzingContainer}>
            <Loading message="Analyzing your food with AI..." />
            <Text style={styles.analyzingText}>
              This may take a few seconds...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  imageContainer: {
    height: 300,
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: typography.body,
    color: colors.textLight,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  optionIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.weightMedium,
    textAlign: 'center',
  },
  analyzingContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  analyzingText: {
    marginTop: 12,
    fontSize: typography.bodySmall,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default ScannerScreen;
