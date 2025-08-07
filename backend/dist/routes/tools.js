"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Available security tools
const availableTools = [
    {
        id: 'nmap',
        name: 'Nmap',
        description: 'Network discovery and security auditing',
        category: 'network',
        requiresApiKey: false
    },
    {
        id: 'shodan',
        name: 'Shodan',
        description: 'Internet intelligence platform',
        category: 'intelligence',
        requiresApiKey: true
    },
    {
        id: 'censys',
        name: 'Censys',
        description: 'Internet-wide scanning platform',
        category: 'intelligence',
        requiresApiKey: true
    },
    {
        id: 'virustotal',
        name: 'VirusTotal',
        description: 'File and URL analysis',
        category: 'malware',
        requiresApiKey: true
    },
    {
        id: 'hunterio',
        name: 'Hunter.io',
        description: 'Email finding and verification',
        category: 'intelligence',
        requiresApiKey: true
    },
    {
        id: 'haveibeenpwned',
        name: 'HaveIBeenPwned',
        description: 'Breach data checking',
        category: 'intelligence',
        requiresApiKey: true
    },
    {
        id: 'securitytrails',
        name: 'SecurityTrails',
        description: 'Domain intelligence',
        category: 'intelligence',
        requiresApiKey: true
    },
    {
        id: 'subfinder',
        name: 'Subfinder',
        description: 'Subdomain discovery',
        category: 'reconnaissance',
        requiresApiKey: false
    },
    {
        id: 'amass',
        name: 'Amass',
        description: 'Network mapping and attack surface discovery',
        category: 'reconnaissance',
        requiresApiKey: false
    },
    {
        id: 'dirb',
        name: 'Dirb',
        description: 'Web content scanner',
        category: 'web',
        requiresApiKey: false
    }
];
// @desc    Get all available tools
// @route   GET /api/tools
// @access  Private
router.get('/', auth_1.protect, async (req, res) => {
    try {
        res.json({
            success: true,
            data: availableTools
        });
    }
    catch (error) {
        console.error('Get tools error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Get tools by category
// @route   GET /api/tools/category/:category
// @access  Private
router.get('/category/:category', auth_1.protect, async (req, res) => {
    try {
        const { category } = req.params;
        const tools = availableTools.filter(tool => tool.category === category);
        res.json({
            success: true,
            data: tools
        });
    }
    catch (error) {
        console.error('Get tools by category error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Get tool by ID
// @route   GET /api/tools/:id
// @access  Private
router.get('/:id', auth_1.protect, async (req, res) => {
    try {
        const { id } = req.params;
        const tool = availableTools.find(t => t.id === id);
        if (!tool) {
            return res.status(404).json({
                success: false,
                error: 'Tool not found'
            });
        }
        res.json({
            success: true,
            data: tool
        });
    }
    catch (error) {
        console.error('Get tool error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
// @desc    Get tool categories
// @route   GET /api/tools/categories
// @access  Private
router.get('/categories', auth_1.protect, async (req, res) => {
    try {
        const categories = [...new Set(availableTools.map(tool => tool.category))];
        res.json({
            success: true,
            data: categories
        });
    }
    catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=tools.js.map