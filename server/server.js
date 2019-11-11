const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/mongoDB');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');


// Load env vars
dotenv.config({ path: './server/config/config.env' });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser())

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());


// Route files
const auth = require('./routes/authRoute')
const order =require('./routes/orderRoute');

// Mount routers
app.use('/auth',auth)
app.use('/order',order)

// Error path handler
app.use(errorHandler)

if (process.env.NODE_ENV === "production") {
  app.use(express.static('build'));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
  
}


const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});