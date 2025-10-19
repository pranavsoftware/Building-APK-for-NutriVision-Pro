import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { getUser } from '../../services/storage.service';
import { updateProfile } from '../../services/auth.service';
import { pickImage, imageToBase64DataURL } from '../../utils/imageHelpers';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const EditProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
      setName(userData.name || '');
      setProfilePicture(userData.profilePicture || null);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    const image = await pickImage();
    if (image) {
      const imageData = imageToBase64DataURL(image.base64);
      setProfilePicture(imageData);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    if (name.trim().length < 2) {
      Alert.alert('Error', 'Name must be at least 2 characters');
      return;
    }

    setUpdating(true);
    try {
      await updateProfile(name.trim(), profilePicture);
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.avatarSection}>
          <Avatar
            source={profilePicture ? { uri: profilePicture } : null}
            name={name}
            size={120}
          />
          <TouchableOpacity style={styles.changePhotoButton} onPress={handlePickImage}>
            <Ionicons name="camera" size={20} color={colors.primary} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.textLight}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email Input (Disabled) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputContainer, styles.disabledInput]}>
              <Ionicons name="mail-outline" size={20} color={colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.disabledText]}
                value={user?.email}
                editable={false}
                placeholder="Email address"
                placeholderTextColor={colors.textLight}
              />
              <Ionicons name="lock-closed" size={20} color={colors.textLight} />
            </View>
            <Text style={styles.helperText}>Email cannot be changed</Text>
          </View>

          {/* Save Button */}
          <Button
            title={updating ? 'Updating...' : 'Save Changes'}
            onPress={handleSave}
            disabled={updating}
            loading={updating}
            style={styles.saveButton}
          />

          {/* Cancel Button */}
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="outline"
            disabled={updating}
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    marginTop: 12,
    fontSize: typography.body,
    color: colors.textLight,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.background,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  changePhotoText: {
    marginLeft: 8,
    fontSize: typography.bodySmall,
    color: colors.primary,
    fontWeight: typography.weightMedium,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  disabledInput: {
    backgroundColor: colors.background,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  disabledText: {
    color: colors.textLight,
  },
  helperText: {
    fontSize: typography.caption,
    color: colors.textLight,
    marginTop: 4,
    marginLeft: 4,
  },
  saveButton: {
    marginTop: 8,
  },
  cancelButton: {
    marginTop: 12,
  },
});

export default EditProfileScreen;
