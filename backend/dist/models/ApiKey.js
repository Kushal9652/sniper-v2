"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKey = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const apiKeySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    service: {
        type: String,
        required: [true, 'Service name is required'],
        enum: [
            'shodan',
            'censys',
            'github',
            'slack',
            'virustotal',
            'hunterio',
            'haveibeenpwned',
            'securitytrails'
        ]
    },
    keyName: {
        type: String,
        required: [true, 'Key name is required'],
        trim: true
    },
    encryptedKey: {
        type: String,
        required: [true, 'Encrypted key is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastUsed: {
        type: Date
    }
}, {
    timestamps: true
});
// Create compound index for user and service
apiKeySchema.index({ userId: 1, service: 1 }, { unique: true });
exports.ApiKey = mongoose_1.default.model('ApiKey', apiKeySchema);
//# sourceMappingURL=ApiKey.js.map