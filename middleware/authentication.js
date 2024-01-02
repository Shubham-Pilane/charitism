const jwt = require('jsonwebtoken');
const secretKey = 'Masai';

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}

module.exports = {auth};
