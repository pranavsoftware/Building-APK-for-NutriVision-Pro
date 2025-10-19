import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { verifyOTP, resendOTP } from '../../services/auth.service';
import { validateOTP } from '../../utils/validators';
import { useAuth } from '../../context/AuthContext';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const OTPScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const { signIn } = useAuth();

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus last filled input
      const lastFilledIndex = Math.min(index + pastedOtp.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    const error = validateOTP(otpString);
    
    if (error) {
      Alert.alert('Error', error);
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(email, otpString);
      // Trigger auth state change to navigate to Dashboard
      signIn();
    } catch (error) {
      Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const response = await resendOTP(email, 'signup');
      Alert.alert('Success', response.message || 'OTP sent successfully!');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            <Ionicons name="mail-unread" size={64} color={colors.primary} />
          </View>
          
          <Text style={commonStyles.heading1}>Verify Your Email</Text>
          <Text style={commonStyles.bodyText}>
            We've sent a 6-digit code to{'\n'}
            <Text style={styles.email}>{email}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={6}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <Button
          title="Verify & Continue"
          onPress={handleVerify}
          loading={loading}
          disabled={otp.join('').length !== 6}
          style={styles.verifyButton}
        />

        {/* Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={resending}>
            <Text style={[styles.resendLink, resending && styles.resendDisabled]}>
              {resending ? 'Sending...' : 'Resend'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 24,
  },
  email: {
    fontWeight: typography.weightSemiBold,
    color: colors.primary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 56,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    fontSize: typography.h3,
    fontWeight: typography.weightBold,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.gray50,
  },
  verifyButton: {
    marginBottom: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  resendLink: {
    fontSize: typography.body,
    color: colors.primary,
    fontWeight: typography.weightSemiBold,
  },
  resendDisabled: {
    opacity: 0.5,
  },
});

export default OTPScreen;
