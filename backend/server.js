const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const favoriteRoutes = require('./routes/favorites');
const dataRoutes = require('./routes/data'); // Import the new data routes

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/data', dataRoutes); // Use the new data routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));