const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/helpers');

/**
 * Validate request based on express-validator rules
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return errorResponse(res, 400, errorMessages[0]);
  }
  
  next();
};

module.exports = { validate };
