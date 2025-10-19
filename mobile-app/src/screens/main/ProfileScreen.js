import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { getUser } from '../../services/storage.service';
import { getUserStats, updateProfile, logout } from '../../services/auth.service';
import { pickImage, imageToBase64DataURL } from '../../utils/imageHelpers';
import { useAuth } from '../../context/AuthContext';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [updating, setUpdating] = useState(false);
  const { signOut } = useAuth();

  const loadData = async () => {
    const userData = await getUser();
    setUser(userData);

    try {
      const statsResponse = await getUserStats();
      setStats(statsResponse.data.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateProfilePicture = async () => {
    const image = await pickImage();
    if (!image) return;

    setUpdating(true);
    try {
      const imageData = imageToBase64DataURL(image.base64);
      await updateProfile(user.name, imageData);
      setUser({ ...user, profilePicture: imageData });
      Alert.alert('Success', 'Profile picture updated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile picture');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            signOut(); // Trigger auth state change
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.header}
        >
          <Avatar
            source={user?.profilePicture ? { uri: user.profilePicture } : null}
            name={user?.name}
            size={100}
            onPress={handleUpdateProfilePicture}
            editable
          />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Stats */}
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <StatItem
                icon="bar-chart"
                value={stats?.totalScans || 0}
                label="Total Scans"
              />
              <StatItem
                icon="flame"
                value={stats?.scansThisWeek || 0}
                label="This Week"
              />
              <StatItem
                icon="calendar"
                value={stats?.memberSince ? new Date(stats.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                label="Member Since"
              />
            </View>
          </Card>

          {/* Menu Options */}
          <MenuOption
            icon="person-outline"
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuOption
            icon="settings-outline"
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
          <MenuOption
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => navigation.navigate('HelpSupport')}
          />
          <MenuOption
            icon="information-circle-outline"
            title="About"
            onPress={() => navigation.navigate('About')}
          />

          {/* Logout Button */}
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            icon={<Ionicons name="log-out-outline" size={24} color={colors.error} />}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatItem = ({ icon, value, label }) => (
  <View style={styles.statItem}>
    <Ionicons name={icon} size={24} color={colors.primary} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuOption = ({ icon, title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card style={styles.menuOption}>
      <Ionicons name={icon} size={24} color={colors.textSecondary} />
      <Text style={styles.menuTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color={colors.textLight} />
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  name: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold,
    color: colors.white,
    marginTop: 16,
  },
  email: {
    fontSize: typography.body,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.h5,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
    marginLeft: 16,
    fontWeight: typography.weightMedium,
  },
  logoutButton: {
    marginTop: 16,
    borderColor: colors.error,
  },
  logoutText: {
    color: colors.error,
  },
});

export default ProfileScreen;
