import mongoose, { Schema, Document } from 'mongoose';

export interface IRequestLog extends Document {
<<<<<<< Updated upstream
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  userId?: string;
  ip?: string;
  userAgent?: string;
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  timestamp: Date;
}

const requestLogSchema = new Schema<IRequestLog>(
  {
    method: {
      type: String,
      required: true,
      index: true,
    },
    path: {
      type: String,
      required: true,
      index: true,
    },
    statusCode: {
      type: Number,
      required: true,
      index: true,
    },
    responseTime: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      index: true,
    },
    ip: String,
    userAgent: String,
    query: Schema.Types.Mixed,
    body: Schema.Types.Mixed,
  },
  {
    timestamps: { createdAt: 'timestamp', updatedAt: false },
    collection: 'request_logs',
  }
=======
    method: string;
    path: string;
    statusCode: number;
    responseTime: number;
    userId?: string;
    ip?: string;
    userAgent?: string;
    query?: Record<string, unknown>;
    body?: Record<string, unknown>;
    timestamp: Date;
}

const requestLogSchema = new Schema<IRequestLog>(
    {
        method: {
            type: String,
            required: true,
            index: true,
        },
        path: {
            type: String,
            required: true,
            index: true,
        },
        statusCode: {
            type: Number,
            required: true,
            index: true,
        },
        responseTime: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            index: true,
        },
        ip: String,
        userAgent: String,
        query: Schema.Types.Mixed,
        body: Schema.Types.Mixed,
    },
    {
        timestamps: { createdAt: 'timestamp', updatedAt: false },
        collection: 'request_logs',
    }
>>>>>>> Stashed changes
);

// TTL index - auto-delete after 30 days
requestLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });
requestLogSchema.index({ path: 1, statusCode: 1, timestamp: -1 });

export const RequestLog = mongoose.model<IRequestLog>('RequestLog', requestLogSchema);
