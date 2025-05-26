import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import authMiddleware from './middlewares/authMiddleware';

import authRoutes from '../services/auth/routes';

dotenv.config();

const app = express();

// ✅ Parse incoming JSON bodies
app.use(express.json());

// ✅ Parse HTTP-only cookies (e.g., refreshToken)
app.use(cookieParser());


// ✅ Request logger
app.use(logger);


// ✅ Mount public auth routes
app.use('/auth', authRoutes);

// ✅ Protected test route
app.get('/protected', authMiddleware, (req, res) => {
  const user = (req as any).user; // consider typing this later for safety
  res.json({ message: 'Protected route success ✅', user });
});

// ✅ Healthcheck route
app.get('/health', (_req, res) => {
  res.json({ status: 'API Gateway Running' });
});

// ✅ Global error handler
app.use(errorHandler);

export default app;
