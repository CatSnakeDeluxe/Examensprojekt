import express from 'express';
import dotenv from 'dotenv';
import PostRoutes from './routes/posts.js';
import UserRoutes from './routes/users.js';
// import LoginRoutes from './routes/login.js';
// import RegisterRoutes from './routes/register.js';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(cors());

app.get('/api/protected', (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        // Token not found
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({
                message: 'Token has expired'
            });
        }
        // console.log(decoded);
        res.json({
            message: `User ${userId} is authorized`
        });
    } catch (error) {
        // Token is invalid
        res.status(401).json({
            message: 'Unauthorized Token is invalid'
        });
    }
});

// routes
app.use('/api/post', PostRoutes);
app.use('/api/user', UserRoutes);
// app.use('/api/login', LoginRoutes);
// app.use('/api/register', RegisterRoutes);

// connect to db
try {
    mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () =>
        console.log('Connected to db & listening on port: ' + PORT),
    );

} catch (err) {
    throw new Error("Couldn't connect to db", err);
}