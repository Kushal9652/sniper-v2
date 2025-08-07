"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Scan_1 = require("../models/Scan");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// @desc    Get all scans for user
// @route   GET /api/scans
// @access  Private
router.get('/', auth_1.protect, async (req, res) => {
    try {
        const scans = await Scan_1.Scan.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({
            success: true,
            count: scans.length,
            data: scans
        });
    }
    catch (error) {
        console.error('Get scans error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Get single scan
// @route   GET /api/scans/:id
// @access  Private
router.get('/:id', auth_1.protect, async (req, res) => {
    try {
        const scan = await Scan_1.Scan.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!scan) {
            return res.status(404).json({
                success: false,
                error: 'Scan not found'
            });
        }
        res.json({
            success: true,
            data: scan
        });
    }
    catch (error) {
        console.error('Get scan error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Create new scan
// @route   POST /api/scans
// @access  Private
router.post('/', auth_1.protect, async (req, res) => {
    try {
        const { name, description, target, scanType, configuration } = req.body;
        if (!name || !target || !scanType) {
            return res.status(400).json({
                success: false,
                error: 'Name, target, and scan type are required'
            });
        }
        const scan = await Scan_1.Scan.create({
            userId: req.user._id,
            name,
            description,
            target,
            scanType,
            configuration: configuration || { tools: [], options: {} }
        });
        res.status(201).json({
            success: true,
            data: scan
        });
    }
    catch (error) {
        console.error('Create scan error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Update scan
// @route   PUT /api/scans/:id
// @access  Private
router.put('/:id', auth_1.protect, async (req, res) => {
    try {
        const { name, description, status, results } = req.body;
        const scan = await Scan_1.Scan.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!scan) {
            return res.status(404).json({
                success: false,
                error: 'Scan not found'
            });
        }
        if (name)
            scan.name = name;
        if (description)
            scan.description = description;
        if (status)
            scan.status = status;
        if (results)
            scan.results = results;
        if (status === 'running' && !scan.startedAt) {
            scan.startedAt = new Date();
        }
        if (status === 'completed' && !scan.completedAt) {
            scan.completedAt = new Date();
        }
        const updatedScan = await scan.save();
        res.json({
            success: true,
            data: updatedScan
        });
    }
    catch (error) {
        console.error('Update scan error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Delete scan
// @route   DELETE /api/scans/:id
// @access  Private
router.delete('/:id', auth_1.protect, async (req, res) => {
    try {
        const scan = await Scan_1.Scan.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!scan) {
            return res.status(404).json({
                success: false,
                error: 'Scan not found'
            });
        }
        await Scan_1.Scan.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Scan deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete scan error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=scans.js.map