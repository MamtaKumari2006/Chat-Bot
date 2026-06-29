const userModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registerUser(req,res){
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { username}
            ]
         });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.cookie("token",token)

        res.status(201).json({
            message: 'User registered successfully',
            
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

async function loginUser(req,res){
    try {
        const { username, email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ 
            $or:[
            {username},
            {email}
        ]
         });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token",token)


        res.status(200).json({
            message: 'Login successful',
            
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    })
}

async function getCurrentUser(req,res){
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Get Current User Error:', error.message);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};
   