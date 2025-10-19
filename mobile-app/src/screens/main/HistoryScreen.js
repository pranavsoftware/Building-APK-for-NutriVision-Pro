import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { getHistory, deleteAnalysis } from '../../services/scanner.service';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadHistory = async (pageNum = 1) => {
    try {
      const response = await getHistory(pageNum, 20);
      if (pageNum === 1) {
        setHistory(response.data.history);
      } else {
        setHistory([...history, ...response.data.history]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load history');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    loadHistory(1);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Scan',
      'Are you sure you want to delete this scan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAnalysis(id);
              setHistory(history.filter((item) => item._id !== id));
              Alert.alert('Success', 'Scan deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete scan');
            }
          },
        },
      ]
    );
  };

  const handleShare = async (item) => {
    try {
      const message = `🥗 NutriVision Pro - Food Analysis\n\n` +
        `Food: ${item.foodName}\n` +
        `Category: ${item.category}\n` +
        `Calories: ${item.caloriesPer100g} cal per 100g\n\n` +
        `Nutritional Info:\n` +
        `• Protein: ${item.nutritionalInfo?.protein || 'N/A'}\n` +
        `• Carbs: ${item.nutritionalInfo?.carbohydrates || 'N/A'}\n` +
        `• Fat: ${item.nutritionalInfo?.fat || 'N/A'}\n` +
        `• Fiber: ${item.nutritionalInfo?.fiber || 'N/A'}\n\n` +
        `Analyzed on: ${new Date(item.scannedAt).toLocaleDateString()}\n\n` +
        `📱 Get NutriVision Pro for instant food nutrition analysis!`;

      await Share.share({
        message: message,
        title: `${item.foodName} - Nutrition Info`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.historyItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ResultDetails', { analysisId: item._id })}
        style={styles.itemContent}
      >
        <View style={styles.itemIcon}>
          <Ionicons name="nutrition" size={28} color={colors.primary} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemName}>{item.foodName}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemDate}>
            {new Date(item.scannedAt).toLocaleString()}
          </Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.itemCalories}>{item.caloriesPer100g}</Text>
          <Text style={styles.itemCaloriesLabel}>cal/100g</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShare(item)}
        >
          <Ionicons name="share-social" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item._id)}
        >
          <Ionicons name="trash" size={20} color={colors.error} />
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  if (loading) {
    return <Loading fullScreen message="Loading history..." />;
  }

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={commonStyles.heading2}>Scan History</Text>
        <Text style={commonStyles.bodyText}>Your nutrition journey</Text>
      </View>

      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color={colors.textLight} />
          <Text style={styles.emptyText}>No scans yet</Text>
          <Text style={styles.emptySubtext}>
            Start scanning food to build your history
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  list: {
    padding: 20,
  },
  historyItem: {
    marginBottom: 12,
    paddingBottom: 0,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemActions: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: `${colors.primary}10`,
  },
  deleteButton: {
    backgroundColor: `${colors.error}10`,
  },
  actionText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightMedium,
    color: colors.primary,
    marginLeft: 6,
  },
  deleteText: {
    color: colors.error,
  },
  itemIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemText: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  itemDate: {
    fontSize: typography.caption,
    color: colors.textLight,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemCalories: {
    fontSize: typography.h5,
    fontWeight: typography.weightBold,
    color: colors.primary,
  },
  itemCaloriesLabel: {
    fontSize: typography.caption,
    color: colors.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: typography.h5,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: typography.body,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HistoryScreen;
