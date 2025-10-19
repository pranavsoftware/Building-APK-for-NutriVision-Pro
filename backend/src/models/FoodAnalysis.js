const mongoose = require('mongoose');

const foodAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
  caloriesPer100g: {
    type: Number,
    required: true,
  },
  nutritionalInfo: {
    protein: String,
    carbohydrates: String,
    fat: String,
    fiber: String,
    vitamins: [String],
    minerals: [String],
  },
  healthBenefits: [String],
  allergens: [String],
  dietaryInfo: {
    isVegan: {
      type: Boolean,
      default: false,
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    isDairyFree: {
      type: Boolean,
      default: false,
    },
  },
  glycemicIndex: String,
  storageTips: String,
  scannedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
foodAnalysisSchema.index({ userId: 1, scannedAt: -1 });

module.exports = mongoose.model('FoodAnalysis', foodAnalysisSchema);
