import mongoose, { Document } from 'mongoose';
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
export declare const ApiKey: mongoose.Model<IApiKey, {}, {}, {}, mongoose.Document<unknown, {}, IApiKey, {}, {}> & IApiKey & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=ApiKey.d.ts.map