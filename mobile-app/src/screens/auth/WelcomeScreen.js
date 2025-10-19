import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { useAuth } from '../../context/AuthContext';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const { width, height } = Dimensions.get('window');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const WelcomeScreen = ({ navigation }) => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      // Navigation will be handled automatically by AuthContext
    } catch (error) {
      Alert.alert(
        'Sign In Failed',
        error.message || 'Failed to sign in with Google. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

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

          {/* Google Sign In Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.8}
              disabled={loading}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.googleGradient}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <>
                    <Svg height="24" width="24" viewBox="0 0 24 24">
                      <Path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <Path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <Path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <Path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </Svg>
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.privacyContainer}>
              <Text style={styles.privacyText}>
                By signing in, you agree to our Terms of Service and Privacy Policy
              </Text>
            </View>
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
  googleButton: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  googleGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
    minHeight: 60,
  },
  googleButtonText: {
    fontSize: typography.h6,
    fontWeight: typography.weightSemiBold,
    color: '#1F1F1F',
    letterSpacing: 0.3,
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
