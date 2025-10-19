const User = require('../models/User');
const FoodAnalysis = require('../models/FoodAnalysis');
const { errorResponse, successResponse } = require('../utils/helpers');

/**
 * @desc    Get user profile
 * @route   GET /api/user/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    successResponse(res, 200, { user }, 'Profile fetched successfully');
  } catch (error) {
    console.error('Get profile error:', error);
    errorResponse(res, 500, 'Error fetching profile');
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/user/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  try {
    const { name, profilePicture } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    // Update fields
    if (name) user.name = name;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    successResponse(res, 200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        totalScans: user.totalScans,
      },
    }, 'Profile updated successfully');
  } catch (error) {
    console.error('Update profile error:', error);
    errorResponse(res, 500, 'Error updating profile');
  }
};

/**
 * @desc    Get user statistics
 * @route   GET /api/user/stats
 * @access  Private
 */
const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get total scans
    const totalScans = await FoodAnalysis.countDocuments({ userId });

    // Get scans this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const scansThisWeek = await FoodAnalysis.countDocuments({
      userId,
      scannedAt: { $gte: oneWeekAgo },
    });

    // Get most scanned category
    const categoryStats = await FoodAnalysis.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const favoriteCategory = categoryStats.length > 0 ? categoryStats[0]._id : 'None';

    successResponse(res, 200, {
      stats: {
        totalScans,
        scansThisWeek,
        favoriteCategory,
        memberSince: req.user.createdAt,
      },
    }, 'Statistics fetched successfully');
  } catch (error) {
    console.error('Get stats error:', error);
    errorResponse(res, 500, 'Error fetching statistics');
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getUserStats,
};
