import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/common/Card';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const DEVELOPER_INFO = {
  name: 'Pranav Rayban',
  title: 'Student at VIT Vellore',
  linkedin: 'https://www.linkedin.com/in/pranavrayban/',
  profilePic: 'https://www.standardsvit.live/profile/Pranav.jpg',
  email: 'raybanpranav@gmail.com',
};

const AboutScreen = ({ navigation }) => {
  const handleOpenLinkedIn = () => {
    Linking.openURL(DEVELOPER_INFO.linkedin).catch(() => {
      Alert.alert('Error', 'Unable to open LinkedIn profile');
    });
  };

  const handleEmailDeveloper = () => {
    const subject = encodeURIComponent('NutriVision Pro - Feedback');
    const url = `mailto:${DEVELOPER_INFO.email}?subject=${subject}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* App Info Header */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.header}
        >
          <View style={styles.appIconContainer}>
            <Ionicons name="nutrition" size={64} color={colors.white} />
          </View>
          <Text style={styles.appName}>NutriVision Pro</Text>
          <Text style={styles.appTagline}>AI-Powered Food Nutrition Analyzer</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* About App */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the App</Text>
            <Card style={styles.card}>
              <Text style={styles.description}>
                NutriVision Pro is an advanced AI-powered mobile application that helps you make informed dietary choices. 
                Simply scan any food item with your camera, and our intelligent system will instantly provide comprehensive 
                nutritional information including calories, macronutrients, vitamins, minerals, health benefits, and dietary 
                compatibility.
              </Text>
            </Card>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <Card style={styles.featureCard}>
              <FeatureItem 
                icon="scan" 
                title="Instant Food Analysis" 
                description="AI-powered image recognition" 
              />
              <FeatureItem 
                icon="analytics" 
                title="Detailed Nutrition Data" 
                description="Calories, macros, vitamins & minerals" 
              />
              <FeatureItem 
                icon="time" 
                title="Scan History" 
                description="Track and review past scans" 
              />
              <FeatureItem 
                icon="share-social" 
                title="Easy Sharing" 
                description="Share nutrition info with friends" 
              />
              <FeatureItem 
                icon="leaf" 
                title="Dietary Filters" 
                description="Vegan, vegetarian, gluten-free options" 
              />
              <FeatureItem 
                icon="heart" 
                title="Health Benefits" 
                description="Learn about food health properties" 
                isLast 
              />
            </Card>
          </View>

          {/* Developer Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Developer</Text>
            <Card style={styles.developerCard}>
              <Image 
                source={{ uri: DEVELOPER_INFO.profilePic }} 
                style={styles.developerImage}
                resizeMode="cover"
              />
              <Text style={styles.developerName}>{DEVELOPER_INFO.name}</Text>
              <Text style={styles.developerTitle}>{DEVELOPER_INFO.title}</Text>
              
              <View style={styles.developerActions}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={handleOpenLinkedIn}
                >
                  <Ionicons name="logo-linkedin" size={24} color={colors.white} />
                  <Text style={styles.socialButtonText}>LinkedIn</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.socialButton, styles.emailButton]}
                  onPress={handleEmailDeveloper}
                >
                  <Ionicons name="mail" size={24} color={colors.white} />
                  <Text style={styles.socialButtonText}>Email</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.developerDescription}>
                Built with ❤️ by a passionate student developer at VIT Vellore, 
                combining cutting-edge AI technology with a mission to promote healthier eating habits.
              </Text>
            </Card>
          </View>

          {/* Copyright */}
          <Text style={styles.copyright}>
            © 2025 NutriVision Pro. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon, title, description, isLast }) => (
  <View style={[styles.featureItem, !isLast && styles.featureItemBorder]}>
    <View style={styles.featureIcon}>
      <Ionicons name={icon} size={24} color={colors.primary} />
    </View>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const TechItem = ({ icon, name, isLast }) => (
  <View style={[styles.techItem, !isLast && styles.techItemBorder]}>
    <Ionicons name={icon} size={24} color={colors.primary} />
    <Text style={styles.techName}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: typography.h2,
    fontWeight: typography.weightBold,
    color: colors.white,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: typography.body,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 8,
    textAlign: 'center',
  },
  version: {
    fontSize: typography.bodySmall,
    color: colors.white,
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  card: {
    padding: 16,
  },
  description: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  featureCard: {
    padding: 0,
    overflow: 'hidden',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  featureItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: typography.bodySmall,
    color: colors.textLight,
  },
  developerCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  developerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  developerName: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  developerTitle: {
    fontSize: typography.body,
    color: colors.textLight,
    marginBottom: 16,
  },
  developerActions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0077B5', // LinkedIn blue
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  emailButton: {
    backgroundColor: colors.secondary,
  },
  socialButtonText: {
    color: colors.white,
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold,
    marginLeft: 8,
  },
  developerDescription: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  techItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  techName: {
    fontSize: typography.body,
    color: colors.textPrimary,
    marginLeft: 12,
    fontWeight: typography.weightMedium,
  },
  legalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
  },
  legalText: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
    marginLeft: 12,
    fontWeight: typography.weightMedium,
  },
  copyright: {
    fontSize: typography.caption,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});

export default AboutScreen;
