import dotenv from 'dotenv';
dotenv.config();

import app from './api-gateway';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
