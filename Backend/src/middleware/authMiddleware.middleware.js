// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.userId = decoded.userId;
    req.userRole = decoded.role; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
  }
};

export default authMiddleware;
