require('dotenv').config();
const app = require('./src/app');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/db/db');

app.use(cors());
connectDB();



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});