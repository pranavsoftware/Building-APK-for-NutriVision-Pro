const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the Gemini model - Use gemini-2.5-flash for image analysis (latest supported model)
const getGeminiModel = () => {
  // Using gemini-2.5-flash - the latest stable model for multimodal content
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

module.exports = { getGeminiModel };
