import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const { width, height } = Dimensions.get('window');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const WelcomeScreen = ({ navigation }) => {
  // Animation values
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotate animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Animated Health Icon with SVG */}
          <Animated.View style={[styles.logoContainer, { transform: [{ translateY }] }]}>
            <Animated.View style={[styles.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
              {/* Rotating background circles */}
              <Animated.View style={[styles.rotatingCircle, { transform: [{ rotate }] }]}>
                <Svg height="140" width="140" viewBox="0 0 140 140">
                  <Circle
                    cx="70"
                    cy="70"
                    r="65"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10,5"
                  />
                </Svg>
              </Animated.View>
              
              {/* Apple SVG Icon */}
              <Svg height="80" width="80" viewBox="0 0 100 100" style={styles.appleIcon}>
                {/* Apple body */}
                <Path
                  d="M 50 20 Q 30 20 20 40 Q 10 60 20 80 Q 30 95 50 95 Q 70 95 80 80 Q 90 60 80 40 Q 70 20 50 20 Z"
                  fill="#FFFFFF"
                />
                {/* Apple leaf */}
                <Path
                  d="M 50 10 Q 45 15 50 20 Q 55 15 50 10 Z M 50 10 Q 60 12 65 5"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  fill="#FFFFFF"
                />
                {/* Heart symbol in center */}
                <Path
                  d="M 50 65 L 40 50 Q 35 45 40 40 Q 45 35 50 40 Q 55 35 60 40 Q 65 45 60 50 L 50 65 Z"
                  fill={colors.primary}
                />
              </Svg>
            </Animated.View>
            <Text style={styles.title}>NutriVision Pro</Text>
            <Text style={styles.subtitle}>AI-Powered Food Nutrition Analyzer</Text>
          </Animated.View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <FeatureItem
              icon="scan"
              title="Instant Analysis"
              description="Scan any food and get detailed nutrition info"
            />
            <FeatureItem
              icon="bar-chart"
              title="Track History"
              description="Keep track of all your scanned foods"
            />
            <FeatureItem
              icon="fitness"
              title="Health Insights"
              description="Get personalized health recommendations"
            />
          </View>

          {/* Auth Buttons */}
          <View style={styles.buttonContainer}>
            {/* Email Sign Up Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="mail" size={24} color={colors.primary} />
                <Text style={styles.primaryButtonText}>Sign Up with Email</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Email Login Button */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
            
            
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <Ionicons name={icon} size={32} color={colors.white} />
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  rotatingCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
  },
  appleIcon: {
    position: 'absolute',
  },
  title: {
    fontSize: typography.h1,
    fontWeight: typography.weightBold,
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  featuresContainer: {
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.h6,
    fontWeight: typography.weightSemiBold,
    color: colors.white,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: typography.bodySmall,
    color: colors.white,
    opacity: 0.8,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  secondaryButton: {
    marginBottom: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
    minHeight: 60,
  },
  primaryButtonText: {
    fontSize: typography.h6,
    fontWeight: typography.weightSemiBold,
    color: colors.primary,
    letterSpacing: 0.3,
  },
  secondaryButtonText: {
    fontSize: typography.body,
    fontWeight: typography.weightMedium,
    color: colors.white,
    textDecorationLine: 'underline',
  },
  privacyContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  privacyText: {
    fontSize: typography.bodySmall,
    color: colors.white,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default WelcomeScreen;
