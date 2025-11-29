import mongoose, { Schema, Document } from 'mongoose';

export interface IErrorLog extends Document {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  level: 'error' | 'warn' | 'critical';
  message: string;
  stack?: string;
  code?: string;
  path?: string;
  method?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  meta?: Record<string, unknown>;
  timestamp: Date;
}

const errorLogSchema = new Schema<IErrorLog>(
  {
    level: {
      type: String,
      enum: ['error', 'warn', 'critical'],
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    stack: String,
    code: String,
    path: String,
    method: String,
    userId: String,
    ip: String,
    userAgent: String,
    meta: Schema.Types.Mixed,
  },
  {
    timestamps: { createdAt: 'timestamp', updatedAt: false },
    collection: 'error_logs',
  }
=======
=======
>>>>>>> Stashed changes
    level: 'error' | 'warn' | 'critical';
    message: string;
    stack?: string;
    code?: string;
    path?: string;
    method?: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
    meta?: Record<string, unknown>;
    timestamp: Date;
}

const errorLogSchema = new Schema<IErrorLog>(
    {
        level: {
            type: String,
            enum: ['error', 'warn', 'critical'],
            required: true,
            index: true,
        },
        message: {
            type: String,
            required: true,
        },
        stack: String,
        code: String,
        path: String,
        method: String,
        userId: String,
        ip: String,
        userAgent: String,
        meta: Schema.Types.Mixed,
    },
    {
        timestamps: { createdAt: 'timestamp', updatedAt: false },
        collection: 'error_logs',
    }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
);

errorLogSchema.index({ level: 1, timestamp: -1 });
errorLogSchema.index({ code: 1, timestamp: -1 });

export const ErrorLog = mongoose.model<IErrorLog>('ErrorLog', errorLogSchema);
