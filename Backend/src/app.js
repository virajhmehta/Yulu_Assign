// backend/src/app.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './utils/database.utils.js';
import authRoutes from './routes/authRoutes.routes.js';
import userRoutes from './routes/userRoutes.routes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
