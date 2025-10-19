const FoodAnalysis = require('../models/FoodAnalysis');
const User = require('../models/User');
const { analyzeFoodImage } = require('../services/gemini.service');
const { errorResponse, successResponse } = require('../utils/helpers');

/**
 * @desc    Analyze food image
 * @route   POST /api/scanner/analyze
 * @access  Private
 */
const analyzeFood = async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return errorResponse(res, 400, 'Please provide a food image');
    }

    // Analyze image with Gemini AI
    const nutritionData = await analyzeFoodImage(imageBase64);

    // Save analysis to database
    const analysis = await FoodAnalysis.create({
      userId: req.user._id,
      foodName: nutritionData.foodName,
      category: nutritionData.category,
      imageBase64: imageBase64,
      caloriesPer100g: nutritionData.caloriesPer100g,
      nutritionalInfo: nutritionData.nutritionalInfo,
      healthBenefits: nutritionData.healthBenefits,
      allergens: nutritionData.allergens,
      dietaryInfo: nutritionData.dietaryInfo,
      glycemicIndex: nutritionData.glycemicIndex,
      storageTips: nutritionData.storageTips,
    });

    // Update user's total scans
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalScans: 1 },
    });

    successResponse(res, 200, {
      analysis: {
        id: analysis._id,
        foodName: analysis.foodName,
        category: analysis.category,
        caloriesPer100g: analysis.caloriesPer100g,
        nutritionalInfo: analysis.nutritionalInfo,
        healthBenefits: analysis.healthBenefits,
        allergens: analysis.allergens,
        dietaryInfo: analysis.dietaryInfo,
        glycemicIndex: analysis.glycemicIndex,
        storageTips: analysis.storageTips,
        scannedAt: analysis.scannedAt,
      },
    }, 'Food analyzed successfully');
  } catch (error) {
    console.error('Analyze food error:', error);
    errorResponse(res, 500, error.message || 'Error analyzing food image');
  }
};

/**
 * @desc    Get analysis history
 * @route   GET /api/scanner/history
 * @access  Private
 */
const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const history = await FoodAnalysis.find({ userId: req.user._id })
      .sort({ scannedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-imageBase64'); // Exclude base64 images from list

    const total = await FoodAnalysis.countDocuments({ userId: req.user._id });

    successResponse(res, 200, {
      history,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    }, 'History fetched successfully');
  } catch (error) {
    console.error('Get history error:', error);
    errorResponse(res, 500, 'Error fetching history');
  }
};

/**
 * @desc    Get single analysis details
 * @route   GET /api/scanner/analysis/:id
 * @access  Private
 */
const getAnalysisById = async (req, res) => {
  try {
    const analysis = await FoodAnalysis.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!analysis) {
      return errorResponse(res, 404, 'Analysis not found');
    }

    successResponse(res, 200, { analysis }, 'Analysis fetched successfully');
  } catch (error) {
    console.error('Get analysis error:', error);
    errorResponse(res, 500, 'Error fetching analysis');
  }
};

/**
 * @desc    Delete analysis
 * @route   DELETE /api/scanner/analysis/:id
 * @access  Private
 */
const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await FoodAnalysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!analysis) {
      return errorResponse(res, 404, 'Analysis not found');
    }

    // Decrement user's total scans
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalScans: -1 },
    });

    successResponse(res, 200, null, 'Analysis deleted successfully');
  } catch (error) {
    console.error('Delete analysis error:', error);
    errorResponse(res, 500, 'Error deleting analysis');
  }
};

/**
 * @desc    Search history
 * @route   GET /api/scanner/search
 * @access  Private
 */
const searchHistory = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return errorResponse(res, 400, 'Please provide a search query');
    }

    const results = await FoodAnalysis.find({
      userId: req.user._id,
      $or: [
        { foodName: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    })
      .sort({ scannedAt: -1 })
      .limit(20)
      .select('-imageBase64');

    successResponse(res, 200, { results }, 'Search completed successfully');
  } catch (error) {
    console.error('Search error:', error);
    errorResponse(res, 500, 'Error searching history');
  }
};

module.exports = {
  analyzeFood,
  getHistory,
  getAnalysisById,
  deleteAnalysis,
  searchHistory,
};
