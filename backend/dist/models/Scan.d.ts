import mongoose, { Document } from 'mongoose';
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
export declare const Scan: mongoose.Model<IScan, {}, {}, {}, mongoose.Document<unknown, {}, IScan, {}, {}> & IScan & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Scan.d.ts.map