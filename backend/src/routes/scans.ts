import express from 'express';
import { Scan } from '../models/Scan';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Get all scans for user
// @route   GET /api/scans
// @access  Private
router.get('/', protect, async (req: any, res) => {
  try {
    const scans = await Scan.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: scans.length,
      data: scans
    });
  } catch (error) {
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
router.get('/:id', protect, async (req: any, res) => {
  try {
    const scan = await Scan.findOne({ 
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
  } catch (error) {
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
router.post('/', protect, async (req: any, res) => {
  try {
    const { name, description, target, scanType, configuration } = req.body;

    if (!name || !target || !scanType) {
      return res.status(400).json({
        success: false,
        error: 'Name, target, and scan type are required'
      });
    }

    const scan = await Scan.create({
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
  } catch (error) {
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
router.put('/:id', protect, async (req: any, res) => {
  try {
    const { name, description, status, results } = req.body;

    const scan = await Scan.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        error: 'Scan not found'
      });
    }

    if (name) scan.name = name;
    if (description) scan.description = description;
    if (status) scan.status = status;
    if (results) scan.results = results;

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
  } catch (error) {
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
router.delete('/:id', protect, async (req: any, res) => {
  try {
    const scan = await Scan.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        error: 'Scan not found'
      });
    }

    await Scan.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Scan deleted successfully'
    });
  } catch (error) {
    console.error('Delete scan error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router;
