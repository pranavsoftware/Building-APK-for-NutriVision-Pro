const express = require('express');
const {
  analyzeFood,
  getHistory,
  getAnalysisById,
  deleteAnalysis,
  searchHistory,
} = require('../controllers/scanner.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/analyze', analyzeFood);
router.get('/history', getHistory);
router.get('/search', searchHistory);
router.get('/analysis/:id', getAnalysisById);
router.delete('/analysis/:id', deleteAnalysis);

module.exports = router;
