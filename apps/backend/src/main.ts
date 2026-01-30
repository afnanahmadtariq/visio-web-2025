import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from root .env or local .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

import express, { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { env, validateEnv } from './config/env';
import { connectMongo } from './db/mongo';
import { prisma } from './db/prisma';
import { applySecurityMiddlewares } from './middlewares/security.middleware';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { errorHandler, NotFoundError } from './middlewares/errorHandler.middleware';
import routes from './routes';

// Validate environment on startup
validateEnv();

const app = express();

// ============================================
// Security Middlewares
// ============================================
applySecurityMiddlewares(app);

// ============================================
// Body Parsers
// ============================================
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser() as unknown as RequestHandler);
app.use(compression() as unknown as RequestHandler);

// ============================================
// Request Logging (after body parsing)
// ============================================
app.use(requestLogger);

// ============================================
// Trust Proxy (for rate limiting behind reverse proxy)
// ============================================
if (env.isProduction) {
  app.set('trust proxy', 1);
}

// ============================================
// API Routes
// ============================================
app.use('/api', routes);

// ============================================
// 404 Handler
// ============================================
app.use((req, res, next) => {
  next(new NotFoundError('Route'));
});

// ============================================
// Global Error Handler
// ============================================
app.use(errorHandler);

// ============================================
// Graceful Shutdown
// ============================================
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  try {
    await prisma.$disconnect();
    console.log('Prisma disconnected');
  } catch (err) {
    console.error('Error disconnecting Prisma:', err);
  }

  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// ============================================
// Start Server
// ============================================
const startServer = async () => {
  try {
    // Connect to MongoDB (optional - logs will be skipped if not connected)
    await connectMongo();

    // Start listening
    app.listen(env.port, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🚀 Server is running!                                       ║
║                                                               ║
║   Environment: ${env.nodeEnv.padEnd(10)}                            ║
║   Port:        ${env.port.toString().padEnd(10)}                            ║
║   API:         http://localhost:${env.port}/api                    ║
║   Health:      http://localhost:${env.port}/api/health             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
