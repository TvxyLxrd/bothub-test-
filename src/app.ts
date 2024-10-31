import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import billingRoutes from './routes/billingRoutes';
import modelRoutes from './routes/modelRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './utils/database';

dotenv.config();

const app = express();
app.use(express.json());
connectDatabase().catch(error => console.log(error));

app.use('/auth', authRoutes);
app.use('/billing', billingRoutes);
app.use('/model', modelRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Text Neural Network API',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/swagger.yaml'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;