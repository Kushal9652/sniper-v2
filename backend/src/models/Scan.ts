import mongoose, { Document, Schema } from 'mongoose';

export interface IScan extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  target: string;
  scanType: 'port' | 'vulnerability' | 'subdomain' | 'email' | 'breach' | 'custom';
  status: 'pending' | 'running' | 'completed' | 'failed';
  configuration: {
    tools: string[];
    options: Record<string, any>;
  };
  results: {
    findings: any[];
    summary: {
      totalFindings: number;
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    rawOutput?: string;
  };
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const scanSchema = new Schema<IScan>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Scan name is required'],
    trim: true,
    maxlength: [100, 'Scan name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  target: {
    type: String,
    required: [true, 'Target is required'],
    trim: true
  },
  scanType: {
    type: String,
    required: [true, 'Scan type is required'],
    enum: ['port', 'vulnerability', 'subdomain', 'email', 'breach', 'custom']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['pending', 'running', 'completed', 'failed'],
    default: 'pending'
  },
  configuration: {
    tools: [{
      type: String,
      required: true
    }],
    options: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  results: {
    findings: [{
      type: Schema.Types.Mixed,
      default: []
    }],
    summary: {
      totalFindings: {
        type: Number,
        default: 0
      },
      critical: {
        type: Number,
        default: 0
      },
      high: {
        type: Number,
        default: 0
      },
      medium: {
        type: Number,
        default: 0
      },
      low: {
        type: Number,
        default: 0
      }
    },
    rawOutput: {
      type: String
    }
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient querying
scanSchema.index({ userId: 1, createdAt: -1 });
scanSchema.index({ status: 1 });
scanSchema.index({ scanType: 1 });

export const Scan = mongoose.model<IScan>('Scan', scanSchema);
