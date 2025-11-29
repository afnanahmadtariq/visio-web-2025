import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthLog extends Document {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAIL' | 'REGISTER' | 'LOGOUT' | 'PASSWORD_RESET';
  email?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  meta?: Record<string, unknown>;
  timestamp: Date;
}

const authLogSchema = new Schema<IAuthLog>(
  {
    type: {
      type: String,
      enum: ['LOGIN_SUCCESS', 'LOGIN_FAIL', 'REGISTER', 'LOGOUT', 'PASSWORD_RESET'],
      required: true,
      index: true,
    },
    email: {
      type: String,
      index: true,
    },
    userId: {
      type: String,
      index: true,
    },
    ip: String,
    userAgent: String,
    meta: Schema.Types.Mixed,
  },
  {
    timestamps: { createdAt: 'timestamp', updatedAt: false },
    collection: 'auth_logs',
  }
=======
=======
>>>>>>> Stashed changes
    type: 'LOGIN_SUCCESS' | 'LOGIN_FAIL' | 'REGISTER' | 'LOGOUT' | 'PASSWORD_RESET';
    email?: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
    meta?: Record<string, unknown>;
    timestamp: Date;
}

const authLogSchema = new Schema<IAuthLog>(
    {
        type: {
            type: String,
            enum: ['LOGIN_SUCCESS', 'LOGIN_FAIL', 'REGISTER', 'LOGOUT', 'PASSWORD_RESET'],
            required: true,
            index: true,
        },
        email: {
            type: String,
            index: true,
        },
        userId: {
            type: String,
            index: true,
        },
        ip: String,
        userAgent: String,
        meta: Schema.Types.Mixed,
    },
    {
        timestamps: { createdAt: 'timestamp', updatedAt: false },
        collection: 'auth_logs',
    }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
);

// Index for querying recent failures
authLogSchema.index({ type: 1, email: 1, timestamp: -1 });
authLogSchema.index({ timestamp: -1 });

export const AuthLog = mongoose.model<IAuthLog>('AuthLog', authLogSchema);
