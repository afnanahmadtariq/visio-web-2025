import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from root .env
config({ path: path.resolve(__dirname, '../../../.env') });

// MongoDB Models (inline for seed script)
const authLogSchema = new mongoose.Schema({
    userId: String,
    email: String,
    action: { type: String, enum: ['LOGIN', 'LOGOUT', 'REGISTER', 'PASSWORD_CHANGE', 'PASSWORD_RESET', 'TOKEN_REFRESH'] },
    success: Boolean,
    ip: String,
    userAgent: String,
    failureReason: String,
    metadata: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
});

const adminActionLogSchema = new mongoose.Schema({
    adminId: { type: String, required: true },
    adminEmail: String,
    action: { type: String, required: true },
    targetType: { type: String, enum: ['USER', 'PRODUCT', 'ORDER', 'CATEGORY', 'REVIEW', 'SYSTEM'] },
    targetId: String,
    changes: mongoose.Schema.Types.Mixed,
    ip: String,
    userAgent: String,
    createdAt: { type: Date, default: Date.now },
});

const paymentLogSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    userId: String,
    provider: { type: String, default: 'stripe' },
    transactionId: String,
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['INITIATED', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED'] },
    rawResponse: mongoose.Schema.Types.Mixed,
    errorMessage: String,
    metadata: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
});

const errorLogSchema = new mongoose.Schema({
    level: { type: String, enum: ['error', 'warn', 'info'], default: 'error' },
    message: { type: String, required: true },
    stack: String,
    code: String,
    path: String,
    method: String,
    userId: String,
    ip: String,
    userAgent: String,
    requestBody: mongoose.Schema.Types.Mixed,
    metadata: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
});

const requestLogSchema = new mongoose.Schema({
    method: { type: String, required: true },
    path: { type: String, required: true },
    statusCode: Number,
    responseTime: Number,
    userId: String,
    ip: String,
    userAgent: String,
    contentLength: Number,
    query: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
});

const aiChatLogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    sessionId: { type: String, required: true },
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
    model: String,
    tokensUsed: Number,
    responseTime: Number,
    metadata: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
});

const AuthLog = mongoose.model('AuthLog', authLogSchema);
const AdminActionLog = mongoose.model('AdminActionLog', adminActionLogSchema);
const PaymentLog = mongoose.model('PaymentLog', paymentLogSchema);
const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);
const RequestLog = mongoose.model('RequestLog', requestLogSchema);
const AiChatLog = mongoose.model('AiChatLog', aiChatLogSchema);

async function seedMongo() {
    console.log('🌱 Starting MongoDB seed...\n');

    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        console.error('❌ MONGO_URL not found in environment variables');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUrl);
        console.log('✅ Connected to MongoDB\n');

        // Clean existing data
        console.log('🧹 Cleaning existing data...');
        await AuthLog.deleteMany({});
        await AdminActionLog.deleteMany({});
        await PaymentLog.deleteMany({});
        await ErrorLog.deleteMany({});
        await RequestLog.deleteMany({});
        await AiChatLog.deleteMany({});

        // ============================================
        // AUTH LOGS
        // ============================================
        console.log('🔐 Creating auth logs...');
        const authLogs = [
            { userId: 'user_1', email: 'john.doe@example.com', action: 'REGISTER', success: true, ip: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            { userId: 'user_1', email: 'john.doe@example.com', action: 'LOGIN', success: true, ip: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            { userId: 'user_2', email: 'jane.smith@example.com', action: 'REGISTER', success: true, ip: '192.168.1.101', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
            { userId: 'user_2', email: 'jane.smith@example.com', action: 'LOGIN', success: true, ip: '192.168.1.101', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
            { userId: 'user_3', email: 'mike.wilson@example.com', action: 'LOGIN', success: false, ip: '192.168.1.102', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)', failureReason: 'Invalid password' },
            { userId: 'user_3', email: 'mike.wilson@example.com', action: 'LOGIN', success: true, ip: '192.168.1.102', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)' },
            { userId: 'admin_1', email: 'admin@visio.com', action: 'LOGIN', success: true, ip: '10.0.0.1', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            { userId: 'user_1', email: 'john.doe@example.com', action: 'PASSWORD_CHANGE', success: true, ip: '192.168.1.100', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            { userId: 'user_2', email: 'jane.smith@example.com', action: 'TOKEN_REFRESH', success: true, ip: '192.168.1.101', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
            { userId: 'user_4', email: 'sarah.jones@example.com', action: 'REGISTER', success: true, ip: '192.168.1.103', userAgent: 'Mozilla/5.0 (Android 14)' },
        ];
        await AuthLog.insertMany(authLogs);
        console.log(`   ✓ Created ${authLogs.length} auth logs`);

        // ============================================
        // ADMIN ACTION LOGS
        // ============================================
        console.log('👑 Creating admin action logs...');
        const adminLogs = [
            { adminId: 'admin_1', adminEmail: 'admin@visio.com', action: 'CREATE_PRODUCT', targetType: 'PRODUCT', targetId: 'prod_1', changes: { name: 'iPhone 15 Pro Max', price: 1199 }, ip: '10.0.0.1' },
            { adminId: 'admin_1', adminEmail: 'admin@visio.com', action: 'UPDATE_PRODUCT', targetType: 'PRODUCT', targetId: 'prod_2', changes: { salePercent: { from: null, to: 10 } }, ip: '10.0.0.1' },
            { adminId: 'admin_1', adminEmail: 'admin@visio.com', action: 'CREATE_CATEGORY', targetType: 'CATEGORY', targetId: 'cat_1', changes: { name: 'Electronics' }, ip: '10.0.0.1' },
            { adminId: 'admin_1', adminEmail: 'admin@visio.com', action: 'UPDATE_ORDER_STATUS', targetType: 'ORDER', targetId: 'order_1', changes: { status: { from: 'PENDING', to: 'SHIPPED' } }, ip: '10.0.0.1' },
            { adminId: 'admin_1', adminEmail: 'admin@visio.com', action: 'DELETE_REVIEW', targetType: 'REVIEW', targetId: 'review_1', changes: { reason: 'Inappropriate content' }, ip: '10.0.0.1' },
            { adminId: 'admin_1', adminEmail: 'admin@visio.com', action: 'UPDATE_USER_ROLE', targetType: 'USER', targetId: 'user_5', changes: { role: { from: 'USER', to: 'ADMIN' } }, ip: '10.0.0.1' },
            { adminId: 'admin_1', adminEmail: 'admin@visio.com', action: 'SYSTEM_CONFIG_UPDATE', targetType: 'SYSTEM', changes: { rateLimitMax: { from: 100, to: 200 } }, ip: '10.0.0.1' },
        ];
        await AdminActionLog.insertMany(adminLogs);
        console.log(`   ✓ Created ${adminLogs.length} admin action logs`);

        // ============================================
        // PAYMENT LOGS
        // ============================================
        console.log('💳 Creating payment logs...');
        const paymentLogs = [
            { orderId: 'order_1', userId: 'user_1', provider: 'stripe', transactionId: 'txn_abc123', amount: 1199.00, status: 'SUCCESS', rawResponse: { id: 'pi_abc123', status: 'succeeded' } },
            { orderId: 'order_2', userId: 'user_2', provider: 'stripe', transactionId: 'txn_def456', amount: 299.00, status: 'SUCCESS', rawResponse: { id: 'pi_def456', status: 'succeeded' } },
            { orderId: 'order_3', userId: 'user_3', provider: 'stripe', transactionId: 'txn_ghi789', amount: 89.00, status: 'FAILED', errorMessage: 'Card declined', rawResponse: { error: { code: 'card_declined' } } },
            { orderId: 'order_3', userId: 'user_3', provider: 'stripe', transactionId: 'txn_ghi790', amount: 89.00, status: 'SUCCESS', rawResponse: { id: 'pi_ghi790', status: 'succeeded' } },
            { orderId: 'order_4', userId: 'user_4', provider: 'stripe', transactionId: 'txn_jkl012', amount: 449.00, status: 'SUCCESS' },
            { orderId: 'order_5', userId: 'user_1', provider: 'stripe', transactionId: 'txn_mno345', amount: 159.00, status: 'REFUNDED', metadata: { reason: 'Customer requested refund' } },
        ];
        await PaymentLog.insertMany(paymentLogs);
        console.log(`   ✓ Created ${paymentLogs.length} payment logs`);

        // ============================================
        // ERROR LOGS
        // ============================================
        console.log('❌ Creating error logs...');
        const errorLogs = [
            { level: 'error', message: 'Database connection timeout', code: 'DB_TIMEOUT', path: '/api/products', method: 'GET', ip: '192.168.1.100' },
            { level: 'warn', message: 'Rate limit exceeded', code: 'RATE_LIMIT', path: '/api/auth/login', method: 'POST', ip: '192.168.1.105', userId: 'user_1' },
            { level: 'error', message: 'Payment processing failed', code: 'PAYMENT_FAILED', path: '/api/orders', method: 'POST', userId: 'user_3', stack: 'Error: Card declined\n    at PaymentService.process...' },
            { level: 'warn', message: 'Invalid token provided', code: 'INVALID_TOKEN', path: '/api/auth/me', method: 'GET', ip: '192.168.1.110' },
            { level: 'info', message: 'User attempted to access admin route', code: 'FORBIDDEN', path: '/api/admin/users', method: 'GET', userId: 'user_2' },
            { level: 'error', message: 'Product not found', code: 'NOT_FOUND', path: '/api/products/invalid-id', method: 'GET', ip: '192.168.1.100' },
        ];
        await ErrorLog.insertMany(errorLogs);
        console.log(`   ✓ Created ${errorLogs.length} error logs`);

        // ============================================
        // REQUEST LOGS
        // ============================================
        console.log('📝 Creating request logs...');
        const requestLogs = [];
        const paths = ['/api/products', '/api/categories', '/api/auth/login', '/api/cart', '/api/orders', '/api/reviews', '/api/wishlist'];
        const methods = ['GET', 'POST', 'PUT', 'DELETE'];
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
            'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36',
        ];

        for (let i = 0; i < 50; i++) {
            requestLogs.push({
                method: methods[Math.floor(Math.random() * methods.length)],
                path: paths[Math.floor(Math.random() * paths.length)],
                statusCode: [200, 200, 200, 201, 400, 401, 404, 500][Math.floor(Math.random() * 8)],
                responseTime: Math.floor(Math.random() * 500) + 10,
                userId: Math.random() > 0.3 ? `user_${Math.floor(Math.random() * 5) + 1}` : undefined,
                ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
                userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
                contentLength: Math.floor(Math.random() * 10000),
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
            });
        }
        await RequestLog.insertMany(requestLogs);
        console.log(`   ✓ Created ${requestLogs.length} request logs`);

        // ============================================
        // AI CHAT LOGS
        // ============================================
        console.log('🤖 Creating AI chat logs...');
        const aiChatLogs = [
            { userId: 'user_1', sessionId: 'session_1', role: 'user', content: 'Can you recommend a good laptop for programming?', model: 'gemini-pro' },
            { userId: 'user_1', sessionId: 'session_1', role: 'assistant', content: 'I recommend the MacBook Pro 16" M3 Max or the Dell XPS 15. Both are excellent for programming with powerful processors and great displays.', model: 'gemini-pro', tokensUsed: 45, responseTime: 1200 },
            { userId: 'user_1', sessionId: 'session_1', role: 'user', content: 'What\'s the price difference?', model: 'gemini-pro' },
            { userId: 'user_1', sessionId: 'session_1', role: 'assistant', content: 'The MacBook Pro 16" M3 Max is $3,499 while the Dell XPS 15 is $2,199. The MacBook is more expensive but offers the M3 Max chip.', model: 'gemini-pro', tokensUsed: 52, responseTime: 980 },
            { userId: 'user_2', sessionId: 'session_2', role: 'user', content: 'I\'m looking for wireless headphones with good noise cancellation', model: 'gemini-pro' },
            { userId: 'user_2', sessionId: 'session_2', role: 'assistant', content: 'The Sony WH-1000XM5 are excellent with industry-leading noise cancellation. They\'re currently on sale at 20% off!', model: 'gemini-pro', tokensUsed: 38, responseTime: 850 },
            { userId: 'user_3', sessionId: 'session_3', role: 'user', content: 'What fitness equipment do you have?', model: 'gemini-pro' },
            { userId: 'user_3', sessionId: 'session_3', role: 'assistant', content: 'We have yoga mats, adjustable dumbbells, and running shoes in our fitness category. The adjustable dumbbell set is popular and currently 20% off.', model: 'gemini-pro', tokensUsed: 48, responseTime: 920 },
            { userId: 'user_4', sessionId: 'session_4', role: 'user', content: 'Track my order #ORD-12345', model: 'gemini-pro' },
            { userId: 'user_4', sessionId: 'session_4', role: 'assistant', content: 'Your order #ORD-12345 is currently being shipped and should arrive within 3-5 business days. You\'ll receive tracking updates via email.', model: 'gemini-pro', tokensUsed: 42, responseTime: 780 },
        ];
        await AiChatLog.insertMany(aiChatLogs);
        console.log(`   ✓ Created ${aiChatLogs.length} AI chat logs`);

        // ============================================
        // SUMMARY
        // ============================================
        console.log('\n✅ MongoDB seeding completed!\n');
        console.log('📊 Summary:');
        console.log(`   • Auth Logs: ${await AuthLog.countDocuments()}`);
        console.log(`   • Admin Action Logs: ${await AdminActionLog.countDocuments()}`);
        console.log(`   • Payment Logs: ${await PaymentLog.countDocuments()}`);
        console.log(`   • Error Logs: ${await ErrorLog.countDocuments()}`);
        console.log(`   • Request Logs: ${await RequestLog.countDocuments()}`);
        console.log(`   • AI Chat Logs: ${await AiChatLog.countDocuments()}`);

    } catch (error) {
        console.error('❌ MongoDB seeding failed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n👋 Disconnected from MongoDB');
    }
}

seedMongo();
