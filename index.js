import express from 'express';
import connectDB from './config/database.js';
const app = express();
const PORT = process.env.PORT;

connectDB();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
