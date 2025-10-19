import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Loading from '../../components/common/Loading';
import { getUser } from '../../services/storage.service';
import { getUserStats } from '../../services/auth.service';
import { getHistory } from '../../services/scanner.service';
import useThemedColors from '../../hooks/useThemedColors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';

const DashboardScreen = ({ navigation }) => {
  const themeColors = useThemedColors();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const userData = await getUser();
      setUser(userData);

      const [statsResponse, historyResponse] = await Promise.all([
        getUserStats(),
        getHistory(1, 3), // Get last 3 scans
      ]);

      setStats(statsResponse.data.stats);
      setRecentScans(historyResponse.data.history);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return <Loading fullScreen message="Loading dashboard..." />;
  }

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <ScrollView style={{ backgroundColor: themeColors.background }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={[themeColors.primary, themeColors.primaryDark]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello, {user?.name}! 👋</Text>
              <Text style={styles.subGreeting}>Ready to scan some food?</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Avatar
                source={user?.profilePicture ? { uri: user.profilePicture } : null}
                name={user?.name}
                size={50}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Quick Scanner Button */}
          <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
            <LinearGradient
              colors={[themeColors.accent, themeColors.accentDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.scanButton}
            >
              <Ionicons name="scan" size={32} color={themeColors.white} />
              <View style={styles.scanButtonText}>
                <Text style={styles.scanButtonTitle}>Scan Food Now</Text>
                <Text style={styles.scanButtonSubtitle}>Get instant nutrition info</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={themeColors.white} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatsCard
              icon="bar-chart"
              value={stats?.totalScans || 0}
              label="Total Scans"
              color={themeColors.primary}
            />
            <StatsCard
              icon="flame"
              value={stats?.scansThisWeek || 0}
              label="This Week"
              color={themeColors.secondary}
            />
            <StatsCard
              icon="heart"
              value={stats?.favoriteCategory || 'None'}
              label="Favorite"
              color={themeColors.error}
            />
          </View>

          {/* Recent Scans */}
          <View style={styles.section}>
              <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Recent Scans</Text>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <Text style={[styles.seeAllText, { color: themeColors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>

            {recentScans.length > 0 ? (
              recentScans.map((scan) => (
                <ScanItem
                  key={scan._id}
                  scan={scan}
                  onPress={() =>
                    navigation.navigate('ResultDetails', { analysisId: scan._id })
                  }
                />
              ))
            ) : (
              <Card>
                <View style={styles.emptyState}>
                  <Ionicons name="scan-outline" size={48} color={themeColors.textLight} />
                  <Text style={[styles.emptyText, { color: themeColors.textPrimary }]}>No scans yet</Text>
                  <Text style={[styles.emptySubtext, { color: themeColors.textLight }]}>
                    Start scanning food to see your history
                  </Text>
                </View>
              </Card>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatsCard = ({ icon, value, label, color }) => {
  const themeColors = useThemedColors();
  return (
    <Card style={styles.statsCard}>
      <View style={[styles.statsIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.statsValue, { color: themeColors.textPrimary }]}>{value}</Text>
      <Text style={[styles.statsLabel, { color: themeColors.textLight }]}>{label}</Text>
    </Card>
  );
};

const ScanItem = ({ scan, onPress }) => {
  const themeColors = useThemedColors();
  return (
    <Card onPress={onPress} style={styles.scanItem}>
      <View style={styles.scanItemContent}>
        <View style={[styles.scanItemIcon, { backgroundColor: `${themeColors.primary}20` }]}>
          <Ionicons name="nutrition" size={24} color={themeColors.primary} />
        </View>
        <View style={styles.scanItemText}>
          <Text style={[styles.scanItemName, { color: themeColors.textPrimary }]}>{scan.foodName}</Text>
          <Text style={[styles.scanItemDate, { color: themeColors.textLight }]}>
            {new Date(scan.scannedAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.scanItemCalories}>
          <Text style={[styles.caloriesValue, { color: themeColors.primary }]}>{scan.caloriesPer100g}</Text>
          <Text style={[styles.caloriesLabel, { color: themeColors.textLight }]}>cal</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: typography.body,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  scanButtonText: {
    flex: 1,
    marginLeft: 16,
  },
  scanButtonTitle: {
    fontSize: typography.h5,
    fontWeight: typography.weightBold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scanButtonSubtitle: {
    fontSize: typography.bodySmall,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsValue: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold,
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: typography.caption,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold,
  },
  seeAllText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightMedium,
  },
  scanItem: {
    marginBottom: 12,
  },
  scanItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scanItemText: {
    flex: 1,
  },
  scanItemName: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    marginBottom: 4,
  },
  scanItemDate: {
    fontSize: typography.caption,
  },
  scanItemCalories: {
    alignItems: 'flex-end',
  },
  caloriesValue: {
    fontSize: typography.h5,
    fontWeight: typography.weightBold,
  },
  caloriesLabel: {
    fontSize: typography.caption,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: typography.bodySmall,
    marginTop: 4,
  },
});

export default DashboardScreen;
