import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/amazona')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Middleware for routing
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Server listening on the specified port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
