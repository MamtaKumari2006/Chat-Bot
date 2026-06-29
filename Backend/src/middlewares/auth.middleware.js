const jwt = require('jsonwebtoken');
const userModel = require('../models/auth.model'); 

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  
  
  if (!token) {
    return res.status(401).json({ error: "please login to access this resource." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ 
        message: "User not found" 
      });
    }

    
    req.user = user;

    next(); 
    
  } catch (error) {
    console.log(error)
    return res.status(401).json({ 
      
      
      message: "Invalid or expired token",
      
    });
  }
}


module.exports = authMiddleware;