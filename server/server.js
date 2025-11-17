import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowOrigins = [
  'http://localhost:5173',                   // local dev
  'https://cosmic-sopapillas-1a04f4.netlify.app'  // your deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// API Endpoints
app.get('/',(req,res) => res.send("API WORKING!"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.listen(port , () => console.log(`server started on PORT: ${port}`));


