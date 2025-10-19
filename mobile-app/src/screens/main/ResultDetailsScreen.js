import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { getAnalysisById } from '../../services/scanner.service';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import commonStyles from '../../styles/commonStyles';

const ResultDetailsScreen = ({ route, navigation }) => {
  const { analysisId, analysis: initialAnalysis, isNewScan } = route.params;
  const [analysis, setAnalysis] = useState(initialAnalysis);
  const [loading, setLoading] = useState(!initialAnalysis);

  useEffect(() => {
    if (!initialAnalysis && analysisId) {
      loadAnalysis();
    }
  }, []);

  useLayoutEffect(() => {
    if (analysis) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={handleShare}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="share-social" size={24} color={colors.primary} />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, analysis]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      const response = await getAnalysisById(analysisId);
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error loading analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!analysis) return;

    try {
      const message = `🥗 NutriVision Pro - Food Analysis\n\n` +
        `Food: ${analysis.foodName}\n` +
        `Category: ${analysis.category}\n` +
        `Calories: ${analysis.caloriesPer100g} cal per 100g\n\n` +
        `Nutritional Info:\n` +
        `• Protein: ${analysis.nutritionalInfo?.protein || 'N/A'}\n` +
        `• Carbs: ${analysis.nutritionalInfo?.carbohydrates || 'N/A'}\n` +
        `• Fat: ${analysis.nutritionalInfo?.fat || 'N/A'}\n` +
        `• Fiber: ${analysis.nutritionalInfo?.fiber || 'N/A'}\n\n` +
        `Health Benefits:\n` +
        `${analysis.healthBenefits?.slice(0, 3).map((b, i) => `${i + 1}. ${b}`).join('\n') || 'N/A'}\n\n` +
        `Dietary Info:\n` +
        `${analysis.dietaryInfo?.isVegan ? '✓ Vegan' : '✗ Not Vegan'}\n` +
        `${analysis.dietaryInfo?.isVegetarian ? '✓ Vegetarian' : '✗ Not Vegetarian'}\n` +
        `${analysis.dietaryInfo?.isGlutenFree ? '✓ Gluten-Free' : '✗ Contains Gluten'}\n\n` +
        `📱 Get NutriVision Pro for instant food nutrition analysis!`;

      await Share.share({
        message: message,
        title: `${analysis.foodName} - Nutrition Info`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return <Loading fullScreen message="Loading analysis..." />;
  }

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView>
        {/* Image */}
        {analysis.imageBase64 && (
          <Image
            source={{ uri: analysis.imageBase64 }}
            style={styles.image}
          />
        )}

        <View style={styles.content}>
          {/* Food Name */}
          <View style={styles.header}>
            <Text style={styles.foodName}>{analysis.foodName}</Text>
            <Text style={styles.category}>{analysis.category}</Text>
          </View>

          {/* Calories Card */}
          <Card style={styles.caloriesCard}>
            <View style={styles.caloriesContent}>
              <Ionicons name="flame" size={32} color={colors.accent} />
              <View style={styles.caloriesText}>
                <Text style={styles.caloriesValue}>{analysis.caloriesPer100g}</Text>
                <Text style={styles.caloriesLabel}>Calories per 100g</Text>
              </View>
            </View>
          </Card>

          {/* Macronutrients */}
          <Card>
            <Text style={styles.sectionTitle}>Macronutrients</Text>
            <NutrientRow
              icon="fitness"
              label="Protein"
              value={analysis.nutritionalInfo.protein}
            />
            <NutrientRow
              icon="nutrition"
              label="Carbohydrates"
              value={analysis.nutritionalInfo.carbohydrates}
            />
            <NutrientRow
              icon="water"
              label="Fat"
              value={analysis.nutritionalInfo.fat}
            />
            <NutrientRow
              icon="leaf"
              label="Fiber"
              value={analysis.nutritionalInfo.fiber}
            />
          </Card>

          {/* Vitamins & Minerals */}
          {(analysis.nutritionalInfo.vitamins?.length > 0 ||
            analysis.nutritionalInfo.minerals?.length > 0) && (
            <Card>
              <Text style={styles.sectionTitle}>Vitamins & Minerals</Text>
              <View style={styles.tagContainer}>
                {analysis.nutritionalInfo.vitamins?.map((vitamin, index) => (
                  <View key={`vitamin-${index}`} style={styles.tag}>
                    <Text style={styles.tagText}>{vitamin}</Text>
                  </View>
                ))}
                {analysis.nutritionalInfo.minerals?.map((mineral, index) => (
                  <View key={`mineral-${index}`} style={styles.tag}>
                    <Text style={styles.tagText}>{mineral}</Text>
                  </View>
                ))}
              </View>
            </Card>
          )}

          {/* Health Benefits */}
          {analysis.healthBenefits?.length > 0 && (
            <Card>
              <Text style={styles.sectionTitle}>Health Benefits</Text>
              {analysis.healthBenefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* Allergens */}
          {analysis.allergens?.length > 0 && (
            <Card style={styles.allergenCard}>
              <View style={styles.allergenHeader}>
                <Ionicons name="warning" size={24} color={colors.error} />
                <Text style={styles.allergenTitle}>Potential Allergens</Text>
              </View>
              <View style={styles.tagContainer}>
                {analysis.allergens.map((allergen, index) => (
                  <View key={index} style={styles.allergenTag}>
                    <Text style={styles.allergenTagText}>{allergen}</Text>
                  </View>
                ))}
              </View>
            </Card>
          )}

          {/* Dietary Info */}
          <Card>
            <Text style={styles.sectionTitle}>Dietary Information</Text>
            <View style={styles.dietaryGrid}>
              <DietaryBadge
                label="Vegan"
                value={analysis.dietaryInfo.isVegan}
              />
              <DietaryBadge
                label="Vegetarian"
                value={analysis.dietaryInfo.isVegetarian}
              />
              <DietaryBadge
                label="Gluten-Free"
                value={analysis.dietaryInfo.isGlutenFree}
              />
              <DietaryBadge
                label="Dairy-Free"
                value={analysis.dietaryInfo.isDairyFree}
              />
            </View>
          </Card>

          {/* Glycemic Index */}
          {analysis.glycemicIndex && (
            <Card>
              <Text style={styles.sectionTitle}>Glycemic Index</Text>
              <Text style={styles.bodyText}>{analysis.glycemicIndex}</Text>
            </Card>
          )}

          {/* Storage Tips */}
          {analysis.storageTips && (
            <Card>
              <Text style={styles.sectionTitle}>Storage Tips</Text>
              <Text style={styles.bodyText}>{analysis.storageTips}</Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const NutrientRow = ({ icon, label, value }) => (
  <View style={styles.nutrientRow}>
    <Ionicons name={icon} size={20} color={colors.primary} />
    <Text style={styles.nutrientLabel}>{label}</Text>
    <Text style={styles.nutrientValue}>{value}</Text>
  </View>
);

const DietaryBadge = ({ label, value }) => (
  <View style={[styles.dietaryBadge, value && styles.dietaryBadgeActive]}>
    <Ionicons
      name={value ? 'checkmark-circle' : 'close-circle'}
      size={20}
      color={value ? colors.success : colors.textLight}
    />
    <Text style={[styles.dietaryLabel, value && styles.dietaryLabelActive]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  foodName: {
    fontSize: typography.h2,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  category: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  caloriesCard: {
    backgroundColor: `${colors.accent}10`,
    borderColor: colors.accent,
    borderWidth: 1,
  },
  caloriesContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloriesText: {
    marginLeft: 16,
  },
  caloriesValue: {
    fontSize: typography.h1,
    fontWeight: typography.weightBold,
    color: colors.accent,
  },
  caloriesLabel: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  nutrientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  nutrientLabel: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  nutrientValue: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: typography.bodySmall,
    color: colors.primary,
    fontWeight: typography.weightMedium,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textSecondary,
    marginLeft: 12,
    lineHeight: 22,
  },
  allergenCard: {
    backgroundColor: `${colors.error}10`,
    borderColor: colors.error,
    borderWidth: 1,
  },
  allergenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  allergenTitle: {
    fontSize: typography.h5,
    fontWeight: typography.weightSemiBold,
    color: colors.error,
    marginLeft: 8,
  },
  allergenTag: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  allergenTagText: {
    fontSize: typography.bodySmall,
    color: colors.white,
    fontWeight: typography.weightMedium,
  },
  dietaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  dietaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  dietaryBadgeActive: {
    backgroundColor: `${colors.success}15`,
  },
  dietaryLabel: {
    fontSize: typography.bodySmall,
    color: colors.textLight,
    marginLeft: 6,
  },
  dietaryLabelActive: {
    color: colors.success,
    fontWeight: typography.weightMedium,
  },
  bodyText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});

export default ResultDetailsScreen;
