"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', auth_1.protect, (0, auth_1.authorize)('admin'), async (req, res) => {
    try {
        const users = await User_1.User.find({}).select('-password');
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', auth_1.protect, async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user._id).select('-password');
        res.json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', auth_1.protect, async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User_1.User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        // Check if username or email already exists
        if (username && username !== user.username) {
            const usernameExists = await User_1.User.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({
                    success: false,
                    error: 'Username already exists'
                });
            }
            user.username = username;
        }
        if (email && email !== user.email) {
            const emailExists = await User_1.User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    error: 'Email already exists'
                });
            }
            user.email = email;
        }
        const updatedUser = await user.save();
        res.json({
            success: true,
            data: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                lastLogin: updatedUser.lastLogin
            }
        });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
router.delete('/profile', auth_1.protect, async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        await User_1.User.findByIdAndDelete(req.user._id);
        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map