import mongoose, { Schema, Document } from 'mongoose';

export interface IAiChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface IAiChatLog extends Document {
  userId?: string;
  sessionId: string;
  type: 'SUPPORT' | 'RECOMMENDATION' | 'PHOTO_SEARCH';
  messages: IAiChatMessage[];
  context?: {
    cartItems?: string[];
    currentFilters?: Record<string, unknown>;
    productIds?: string[];
  };
  meta?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const aiChatMessageSchema = new Schema<IAiChatMessage>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const aiChatLogSchema = new Schema<IAiChatLog>(
  {
    userId: {
      type: String,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['SUPPORT', 'RECOMMENDATION', 'PHOTO_SEARCH'],
      required: true,
      index: true,
    },
    messages: [aiChatMessageSchema],
    context: {
      cartItems: [String],
      currentFilters: Schema.Types.Mixed,
      productIds: [String],
    },
    meta: Schema.Types.Mixed,
  },
  {
    timestamps: true,
    collection: 'ai_chat_logs',
  }
);

aiChatLogSchema.index({ userId: 1, createdAt: -1 });
aiChatLogSchema.index({ sessionId: 1 });

export const AiChatLog = mongoose.model<IAiChatLog>('AiChatLog', aiChatLogSchema);
