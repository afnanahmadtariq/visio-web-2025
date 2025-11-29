import mongoose, { Schema, Document } from 'mongoose';

export type AdminAction =
  | 'PRODUCT_CREATE'
  | 'PRODUCT_UPDATE'
  | 'PRODUCT_DELETE'
  | 'CATEGORY_CREATE'
  | 'CATEGORY_UPDATE'
  | 'CATEGORY_DELETE'
  | 'USER_UPDATE'
  | 'USER_DELETE'
  | 'ORDER_UPDATE'
  | 'CREDIT_ADJUST';

export interface IAdminActionLog extends Document {
  adminId: string;
  action: AdminAction;
  via: 'API' | 'DLL';
  targetId?: string;
  targetType?: string;
  details?: Record<string, unknown>;
  ip?: string;
  timestamp: Date;
}

const adminActionLogSchema = new Schema<IAdminActionLog>(
  {
    adminId: {
      type: String,
      required: true,
      index: true,
    },
    action: {
      type: String,
      enum: [
        'PRODUCT_CREATE',
        'PRODUCT_UPDATE',
        'PRODUCT_DELETE',
        'CATEGORY_CREATE',
        'CATEGORY_UPDATE',
        'CATEGORY_DELETE',
        'USER_UPDATE',
        'USER_DELETE',
        'ORDER_UPDATE',
        'CREDIT_ADJUST',
      ],
      required: true,
      index: true,
    },
    via: {
      type: String,
      enum: ['API', 'DLL'],
      required: true,
    },
    targetId: String,
    targetType: String,
    details: Schema.Types.Mixed,
    ip: String,
  },
  {
    timestamps: { createdAt: 'timestamp', updatedAt: false },
    collection: 'admin_action_logs',
  }
);

adminActionLogSchema.index({ adminId: 1, timestamp: -1 });
adminActionLogSchema.index({ action: 1, timestamp: -1 });

export const AdminActionLog = mongoose.model<IAdminActionLog>('AdminActionLog', adminActionLogSchema);
