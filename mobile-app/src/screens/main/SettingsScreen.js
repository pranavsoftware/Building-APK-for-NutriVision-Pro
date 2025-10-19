import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { getColors } from '../../styles/theme';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const LANGUAGE_KEY = '@nutrivision_language';
const UNITS_KEY = '@nutrivision_units';

const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'de', name: 'German', flag: '🇩🇪' },
  { id: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { id: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

const UNITS = [
  { id: 'metric', name: 'Metric', description: 'g, kg, ml, l' },
  { id: 'imperial', name: 'Imperial', description: 'oz, lb, fl oz, cups' },
];

const PRIVACY_POINTS = [
  { id: 1, title: 'Data Collection', description: 'We only collect data necessary for app functionality', icon: 'shield-checkmark' },
  { id: 2, title: 'Secure Storage', description: 'All your data is encrypted and stored securely', icon: 'lock-closed' },
  { id: 3, title: 'No Third Party Sharing', description: 'We never share your personal data with third parties', icon: 'people' },
  { id: 4, title: 'Image Privacy', description: 'Food images are analyzed and not stored permanently', icon: 'image' },
  { id: 5, title: 'Account Control', description: 'You can delete your account and data anytime', icon: 'trash' },
];

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const colors = getColors(isDarkMode);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedUnit, setSelectedUnit] = useState('metric');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      
      // Load language preference
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
      
      // Load units preference
      const savedUnits = await AsyncStorage.getItem(UNITS_KEY);
      if (savedUnits) {
        setSelectedUnit(savedUnits);
      }
      
      // Simulate loading delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDarkThemeToggle = async (value) => {
    try {
      await toggleTheme();
      
      Alert.alert(
        'Theme Changed',
        value 
          ? 'Dark theme enabled successfully!' 
          : 'Light theme enabled successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error saving theme setting:', error);
      Alert.alert('Error', 'Failed to save theme setting');
    }
  };

  const handleLanguageSelect = () => {
    const currentLanguage = LANGUAGES.find(lang => lang.id === selectedLanguage);
    
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      [
        ...LANGUAGES.map(lang => ({
          text: `${lang.flag} ${lang.name}${lang.id === selectedLanguage ? ' ✓' : ''}`,
          onPress: async () => {
            try {
              setSelectedLanguage(lang.id);
              await AsyncStorage.setItem(LANGUAGE_KEY, lang.id);
              Alert.alert('Success', `Language changed to ${lang.name}`);
            } catch (error) {
              console.error('Error saving language:', error);
              Alert.alert('Error', 'Failed to save language preference');
            }
          }
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleUnitsSelect = () => {
    Alert.alert(
      'Select Units',
      'Choose your preferred measurement system',
      [
        ...UNITS.map(unit => ({
          text: `${unit.name} (${unit.description})${unit.id === selectedUnit ? ' ✓' : ''}`,
          onPress: async () => {
            try {
              setSelectedUnit(unit.id);
              await AsyncStorage.setItem(UNITS_KEY, unit.id);
              Alert.alert('Success', `Units changed to ${unit.name}`);
            } catch (error) {
              console.error('Error saving units:', error);
              Alert.alert('Error', 'Failed to save units preference');
            }
          }
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert(
      'Privacy Policy',
      'View detailed privacy policy',
      [
        { text: 'View Full Policy', onPress: () => {
          // Could navigate to a full privacy policy screen
          Alert.alert('Privacy Policy', 'Full privacy policy would open here in a web view or dedicated screen.');
        }},
        { text: 'Close', style: 'cancel' }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentLanguage = LANGUAGES.find(lang => lang.id === selectedLanguage);
  const currentUnit = UNITS.find(unit => unit.id === selectedUnit);

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Appearance Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Appearance</Text>
            
            <Card style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
                    <Ionicons name="moon" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Dark Theme</Text>
                    <Text style={[styles.settingDescription, { color: colors.textLight }]}>Enable dark mode</Text>
                  </View>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={handleDarkThemeToggle}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={isDarkMode ? colors.white : colors.textLight}
                />
              </View>
            </Card>
          </View>

          {/* App Preferences */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Preferences</Text>
            
            <TouchableOpacity onPress={handleLanguageSelect}>
              <Card style={styles.settingCard}>
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: `${colors.accent}20` }]}>
                      <Ionicons name="language" size={24} color={colors.accent} />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Language</Text>
                      <Text style={[styles.settingDescription, { color: colors.textLight }]}>
                        {currentLanguage ? `${currentLanguage.flag} ${currentLanguage.name}` : 'Select Language'}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={colors.textLight} />
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleUnitsSelect}>
              <Card style={styles.settingCard}>
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: `${colors.warning}20` }]}>
                      <Ionicons name="scale" size={24} color={colors.warning} />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Units</Text>
                      <Text style={[styles.settingDescription, { color: colors.textLight }]}>
                        {currentUnit ? currentUnit.name : 'Select Units'}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={colors.textLight} />
                </View>
              </Card>
            </TouchableOpacity>
          </View>

          {/* Privacy & Security */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Privacy & Security</Text>
            
            {PRIVACY_POINTS.map((point, index) => (
              <Card key={point.id} style={styles.privacyCard}>
                <View style={styles.privacyRow}>
                  <View style={[styles.iconContainer, { backgroundColor: `${colors.success}20` }]}>
                    <Ionicons name={point.icon} size={22} color={colors.success} />
                  </View>
                  <View style={styles.privacyTextContainer}>
                    <Text style={[styles.privacyTitle, { color: colors.textPrimary }]}>{point.title}</Text>
                    <Text style={[styles.privacyDescription, { color: colors.textSecondary }]}>{point.description}</Text>
                  </View>
                </View>
              </Card>
            ))}

            <TouchableOpacity onPress={handlePrivacyPress} style={styles.fullPolicyButton}>
              <Card style={[styles.settingCard, { borderColor: colors.primary, borderWidth: 1 }]}>
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
                      <Ionicons name="document-text" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: colors.primary }]}>View Full Privacy Policy</Text>
                      <Text style={[styles.settingDescription, { color: colors.textLight }]}>Read complete terms</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={colors.primary} />
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: typography.body,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.weightBold,
    marginBottom: 12,
  },
  settingCard: {
    marginBottom: 12,
    paddingVertical: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: typography.caption,
  },
  privacyCard: {
    marginBottom: 10,
    paddingVertical: 10,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  privacyTextContainer: {
    flex: 1,
    paddingTop: 4,
  },
  privacyTitle: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: typography.caption,
    lineHeight: 18,
  },
  fullPolicyButton: {
    marginTop: 8,
  },
});

export default SettingsScreen;
