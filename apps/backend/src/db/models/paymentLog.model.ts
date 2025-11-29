import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentLog extends Document {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  orderId: string;
  userId: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  amount: number;
  currency: string;
  provider?: string;
  transactionId?: string;
  errorMessage?: string;
  meta?: Record<string, unknown>;
  timestamp: Date;
}

const paymentLogSchema = new Schema<IPaymentLog>(
  {
    orderId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    provider: String,
    transactionId: String,
    errorMessage: String,
    meta: Schema.Types.Mixed,
  },
  {
    timestamps: { createdAt: 'timestamp', updatedAt: false },
    collection: 'payment_logs',
  }
=======
=======
>>>>>>> Stashed changes
    orderId: string;
    userId: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
    amount: number;
    currency: string;
    provider?: string;
    transactionId?: string;
    errorMessage?: string;
    meta?: Record<string, unknown>;
    timestamp: Date;
}

const paymentLogSchema = new Schema<IPaymentLog>(
    {
        orderId: {
            type: String,
            required: true,
            index: true,
        },
        userId: {
            type: String,
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
            required: true,
            index: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: 'USD',
        },
        provider: String,
        transactionId: String,
        errorMessage: String,
        meta: Schema.Types.Mixed,
    },
    {
        timestamps: { createdAt: 'timestamp', updatedAt: false },
        collection: 'payment_logs',
    }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
);

paymentLogSchema.index({ userId: 1, timestamp: -1 });
paymentLogSchema.index({ status: 1, timestamp: -1 });

export const PaymentLog = mongoose.model<IPaymentLog>('PaymentLog', paymentLogSchema);
