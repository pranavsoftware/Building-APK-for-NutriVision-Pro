const { getGeminiModel } = require('../config/gemini');

/**
 * Analyze food image with Gemini AI
 */
const analyzeFoodImage = async (imageBase64) => {
  try {
    const model = getGeminiModel();

    // Prepare the prompt for structured nutrition analysis
    const prompt = `Analyze this food image and provide detailed nutritional information in the following JSON format. Be accurate and comprehensive:

{
  "foodName": "Name of the food item",
  "category": "Food category (e.g., Fruit, Vegetable, Grain, Protein, Dairy, Snack, Beverage, etc.)",
  "caloriesPer100g": numeric value only,
  "nutritionalInfo": {
    "protein": "X grams per 100g",
    "carbohydrates": "X grams per 100g",
    "fat": "X grams per 100g",
    "fiber": "X grams per 100g",
    "vitamins": ["Vitamin A", "Vitamin C", etc.],
    "minerals": ["Iron", "Calcium", etc.]
  },
  "healthBenefits": [
    "Benefit 1",
    "Benefit 2",
    "Benefit 3"
  ],
  "allergens": ["potential allergens if any, otherwise empty array"],
  "dietaryInfo": {
    "isVegan": true/false,
    "isVegetarian": true/false,
    "isGlutenFree": true/false,
    "isDairyFree": true/false
  },
  "glycemicIndex": "Low/Medium/High",
  "storageTips": "How to store this food properly"
}

Provide ONLY the JSON response, no additional text. If the image is not clearly identifiable as food, return an error JSON: {"error": "Unable to identify food item"}`;

    // Convert base64 to proper format for Gemini
    const imageData = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    // Generate content with image
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData,
          mimeType: 'image/jpeg',
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const nutritionData = JSON.parse(jsonMatch[0]);

    // Check for error in response
    if (nutritionData.error) {
      throw new Error(nutritionData.error);
    }

    return nutritionData;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    throw new Error('Failed to analyze food image. Please try again.');
  }
};

module.exports = {
  analyzeFoodImage,
};
