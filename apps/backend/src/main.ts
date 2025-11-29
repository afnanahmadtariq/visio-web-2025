import 'dotenv/config';
import express from 'express';
import { prisma } from './lib/prisma';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 10000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// Health check endpoint with database connection test
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.send({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).send({ status: 'error', database: 'disconnected' });
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
