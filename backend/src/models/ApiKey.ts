import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IApiKey extends Document {
  userId: mongoose.Types.ObjectId;
  service: string;
  keyName: string;
  encryptedKey: string;
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const apiKeySchema = new Schema<IApiKey>({
  userId: {
    type: Schema.Types.ObjectId,
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

export const ApiKey = mongoose.model<IApiKey>('ApiKey', apiKeySchema);
