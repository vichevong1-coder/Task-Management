const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const { errorHandler } = require('./src/middlewares/errormiddleware');  

dotenv.config();

connectDB();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Api is working...');
});

app.use(errorHandler);

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});