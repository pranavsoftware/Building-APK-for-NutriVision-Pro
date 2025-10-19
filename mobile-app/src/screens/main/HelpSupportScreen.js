import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const SUPPORT_EMAIL = 'raybanpranav@gmail.com';

const HelpSupportScreen = ({ navigation }) => {
  const handleEmailSupport = () => {
    const subject = encodeURIComponent('NutriVision Pro - Support Request');
    const body = encodeURIComponent('Hi NutriVision Team,\n\nI need help with:\n\n');
    const url = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  const handleCopyEmail = () => {
    // Since we can't use Clipboard directly, we'll show the email
    Alert.alert(
      'Support Email',
      SUPPORT_EMAIL,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'Send Email', onPress: handleEmailSupport }
      ]
    );
  };

  const supportTopics = [
    {
      id: 1,
      icon: 'scan',
      title: 'How to scan food?',
      description: 'Open the Scanner tab, take a photo or select from gallery, and get instant nutrition information.',
    },
    {
      id: 2,
      icon: 'analytics',
      title: 'Understanding nutrition data',
      description: 'View calories, proteins, carbs, fats, vitamins, minerals, and health benefits for each food item.',
    },
    {
      id: 3,
      icon: 'time',
      title: 'Viewing scan history',
      description: 'Access your past scans from the History tab. Search, filter, and share your nutrition data.',
    },
    {
      id: 4,
      icon: 'image',
      title: 'Image quality tips',
      description: 'For best results, ensure good lighting, clear focus, and capture the entire food item in the frame.',
    },
    {
      id: 5,
      icon: 'shield-checkmark',
      title: 'Data privacy',
      description: 'Your data is securely stored. We never share your personal information or scan data with third parties.',
    },
    {
      id: 6,
      icon: 'bug',
      title: 'Report a problem',
      description: 'Found a bug or incorrect nutrition data? Contact our support team and we\'ll fix it quickly.',
    },
  ];

  const faqItems = [
    {
      question: 'Is the app free to use?',
      answer: 'Yes! NutriVision Pro is completely free to use with unlimited scans.',
    },
    {
      question: 'How accurate is the nutrition data?',
      answer: 'We use advanced AI powered by Google Gemini to provide accurate nutrition information based on USDA food database.',
    },
    {
      question: 'Can I use the app offline?',
      answer: 'You need an internet connection to analyze food images. However, you can view your scan history offline.',
    },
    {
      question: 'Which foods can I scan?',
      answer: 'You can scan any food item - fruits, vegetables, prepared meals, packaged foods, beverages, and more!',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Contact Support Card */}
          <Card style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="mail" size={32} color={colors.white} />
              </View>
              <Text style={styles.contactTitle}>Need Help?</Text>
              <Text style={styles.contactDescription}>
                Our support team is here to help you
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.emailContainer}
              onPress={handleCopyEmail}
            >
              <Ionicons name="mail-outline" size={20} color={colors.primary} />
              <Text style={styles.emailText}>{SUPPORT_EMAIL}</Text>
              <Ionicons name="copy-outline" size={20} color={colors.primary} />
            </TouchableOpacity>

            <Button
              title="Send Email"
              onPress={handleEmailSupport}
              icon={<Ionicons name="send" size={20} color={colors.white} />}
              style={styles.emailButton}
            />
          </Card>

          {/* Support Topics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support Topics</Text>
            
            {supportTopics.map((topic) => (
              <Card key={topic.id} style={styles.topicCard}>
                <View style={styles.topicContent}>
                  <View style={[styles.topicIcon, { backgroundColor: `${colors.primary}20` }]}>
                    <Ionicons name={topic.icon} size={24} color={colors.primary} />
                  </View>
                  <View style={styles.topicText}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicDescription}>{topic.description}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            
            {faqItems.map((item, index) => (
              <Card key={index} style={styles.faqCard}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              </Card>
            ))}
          </View>

          {/* Quick Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Links</Text>
            
            <TouchableOpacity>
              <Card style={styles.linkCard}>
                <Ionicons name="document-text" size={24} color={colors.primary} />
                <Text style={styles.linkText}>User Guide</Text>
                <Ionicons name="chevron-forward" size={24} color={colors.textLight} />
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.linkCard}>
                <Ionicons name="videocam" size={24} color={colors.secondary} />
                <Text style={styles.linkText}>Video Tutorials</Text>
                <Ionicons name="chevron-forward" size={24} color={colors.textLight} />
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.linkCard}>
                <Ionicons name="chatbubbles" size={24} color={colors.accent} />
                <Text style={styles.linkText}>Community Forum</Text>
                <Ionicons name="chevron-forward" size={24} color={colors.textLight} />
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
  contactCard: {
    marginBottom: 24,
    alignItems: 'center',
    paddingVertical: 24,
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: typography.body,
    color: colors.textLight,
    textAlign: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}10`,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  emailText: {
    flex: 1,
    fontSize: typography.body,
    color: colors.primary,
    fontWeight: typography.weightMedium,
    marginLeft: 12,
  },
  emailButton: {
    width: '100%',
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
  topicCard: {
    marginBottom: 12,
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicText: {
    flex: 1,
  },
  topicTitle: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: typography.bodySmall,
    color: colors.textLight,
    lineHeight: 20,
  },
  faqCard: {
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 16,
  },
  linkText: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: typography.weightMedium,
    color: colors.textPrimary,
    marginLeft: 12,
  },
});

export default HelpSupportScreen;
