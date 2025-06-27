// Middleware for validating request body using a Joi schema
module.exports = (schema) => (req, res, next) => {
  // Validate incoming request body against the provided schema
  const { error } = schema.validate(req.body);
  // If validation fails, return 400 Bad Request with the error message
  if (error) return res.status(400).json({ message: `error in validation ${error.message}` });
  next();
};
