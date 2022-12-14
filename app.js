const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Initialize express
const app = express();

// Database Connection
const ConnectDB = require('./db/connection');

// Routes
const User = require('./routes/user');
const Payment = require('./routes/payments');

// middleware
app.use(express.json());
app.use(cors());

// Testing route
app.get('/', (req, res) => {
  res.send('Hello world from the server');
});

// Microservices
app.use('/register', User);
app.use('/payment', Payment);

app.listen(process.env.PORT || 5000, () =>
  ConnectDB()
    .then(() => console.log('Server is up and running'))
    .catch(() =>
      console.log('Server is running , but database connection failed')
    )
);
