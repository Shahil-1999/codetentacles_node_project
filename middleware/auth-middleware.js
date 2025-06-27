const jwt = require('jsonwebtoken');

// Middleware to authenticate and authorize users based on JWT and roles
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    // Extract token from Authorization header: "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Check if user role is allowed (if roles are specified)
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware
