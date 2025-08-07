"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Generate JWT Token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'fallback-secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user exists
        const userExists = await User_1.User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'User already exists with this email or username'
            });
        }
        // Create user
        const user = await User_1.User.create({
            username,
            email,
            password
        });
        if (user) {
            const userDoc = user;
            res.status(201).json({
                success: true,
                data: {
                    _id: userDoc._id,
                    username: userDoc.username,
                    email: userDoc.email,
                    role: userDoc.role,
                    token: generateToken(userDoc._id.toString())
                }
            });
        }
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error during registration'
        });
    }
});
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for user
        const user = await User_1.User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        // Update last login
        user.lastLogin = new Date();
        await user.save();
        const userDoc = user;
        res.json({
            success: true,
            data: {
                _id: userDoc._id,
                username: userDoc.username,
                email: userDoc.email,
                role: userDoc.role,
                token: generateToken(userDoc._id.toString())
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error during login'
        });
    }
});
// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', auth_1.protect, async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        res.json({
            success: true,
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                lastLogin: user.lastLogin
            }
        });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', auth_1.protect, async (req, res) => {
    try {
        // In a real application, you might want to blacklist the token
        // For now, we'll just return a success response
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error during logout'
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map