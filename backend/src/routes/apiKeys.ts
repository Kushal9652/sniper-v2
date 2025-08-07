import express from 'express';
import crypto from 'crypto';
import { ApiKey } from '../models/ApiKey';
import { protect } from '../middleware/auth';

const router = express.Router();

// Encryption/Decryption functions
const encryptKey = (key: string): string => {
  const algorithm = 'aes-256-cbc';
  const secretKey = process.env.ENCRYPTION_KEY || 'your-encryption-key-32-chars-long';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, secretKey);
  let encrypted = cipher.update(key, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

const decryptKey = (encryptedKey: string): string => {
  const algorithm = 'aes-256-cbc';
  const secretKey = process.env.ENCRYPTION_KEY || 'your-encryption-key-32-chars-long';
  const [ivHex, encrypted] = encryptedKey.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// @desc    Get all API keys for user
// @route   GET /api/api-keys
// @access  Private
router.get('/', protect, async (req: any, res) => {
  try {
    const apiKeys = await ApiKey.find({ userId: req.user._id, isActive: true });
    
    res.json({
      success: true,
      data: apiKeys.map(key => ({
        _id: key._id,
        service: key.service,
        keyName: key.keyName,
        isActive: key.isActive,
        lastUsed: key.lastUsed,
        createdAt: key.createdAt
      }))
    });
  } catch (error) {
    console.error('Get API keys error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Get specific API key
// @route   GET /api/api-keys/:id
// @access  Private
router.get('/:id', protect, async (req: any, res) => {
  try {
    const apiKey = await ApiKey.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        error: 'API key not found'
      });
    }

    res.json({
      success: true,
      data: {
        _id: apiKey._id,
        service: apiKey.service,
        keyName: apiKey.keyName,
        isActive: apiKey.isActive,
        lastUsed: apiKey.lastUsed,
        createdAt: apiKey.createdAt
      }
    });
  } catch (error) {
    console.error('Get API key error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Create or update API key
// @route   POST /api/api-keys
// @access  Private
router.post('/', protect, async (req: any, res) => {
  try {
    const { service, keyName, key } = req.body;

    if (!service || !keyName || !key) {
      return res.status(400).json({
        success: false,
        error: 'Service, key name, and key are required'
      });
    }

    // Encrypt the API key
    const encryptedKey = encryptKey(key);

    // Check if API key already exists for this service
    const existingKey = await ApiKey.findOne({ 
      userId: req.user._id, 
      service 
    });

    let apiKey;
    if (existingKey) {
      // Update existing key
      existingKey.keyName = keyName;
      existingKey.encryptedKey = encryptedKey;
      existingKey.isActive = true;
      apiKey = await existingKey.save();
    } else {
      // Create new key
      apiKey = await ApiKey.create({
        userId: req.user._id,
        service,
        keyName,
        encryptedKey
      });
    }

    res.status(201).json({
      success: true,
      data: {
        _id: apiKey._id,
        service: apiKey.service,
        keyName: apiKey.keyName,
        isActive: apiKey.isActive,
        createdAt: apiKey.createdAt
      }
    });
  } catch (error) {
    console.error('Create API key error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Update API key
// @route   PUT /api/api-keys/:id
// @access  Private
router.put('/:id', protect, async (req: any, res) => {
  try {
    const { keyName, key, isActive } = req.body;

    const apiKey = await ApiKey.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        error: 'API key not found'
      });
    }

    if (keyName) apiKey.keyName = keyName;
    if (key) apiKey.encryptedKey = encryptKey(key);
    if (typeof isActive === 'boolean') apiKey.isActive = isActive;

    const updatedApiKey = await apiKey.save();

    res.json({
      success: true,
      data: {
        _id: updatedApiKey._id,
        service: updatedApiKey.service,
        keyName: updatedApiKey.keyName,
        isActive: updatedApiKey.isActive,
        lastUsed: updatedApiKey.lastUsed,
        createdAt: updatedApiKey.createdAt
      }
    });
  } catch (error) {
    console.error('Update API key error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Delete API key
// @route   DELETE /api/api-keys/:id
// @access  Private
router.delete('/:id', protect, async (req: any, res) => {
  try {
    const apiKey = await ApiKey.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        error: 'API key not found'
      });
    }

    await ApiKey.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'API key deleted successfully'
    });
  } catch (error) {
    console.error('Delete API key error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Get decrypted API key for use
// @route   GET /api/api-keys/:id/decrypt
// @access  Private
router.get('/:id/decrypt', protect, async (req: any, res) => {
  try {
    const apiKey = await ApiKey.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        error: 'API key not found'
      });
    }

    // Update last used timestamp
    apiKey.lastUsed = new Date();
    await apiKey.save();

    // Decrypt the key
    const decryptedKey = decryptKey(apiKey.encryptedKey);

    res.json({
      success: true,
      data: {
        service: apiKey.service,
        keyName: apiKey.keyName,
        key: decryptedKey
      }
    });
  } catch (error) {
    console.error('Decrypt API key error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router;
