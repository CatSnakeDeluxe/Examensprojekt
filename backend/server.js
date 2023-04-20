import express from 'express';
import dotenv from 'dotenv';
import PostsRoutes from './routes/posts.js';
import UserRoutes from './routes/users.js';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/posts', PostsRoutes);
app.use('/api/user', UserRoutes);

// connect to db
try {
    mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () =>
        console.log('Connected to db & listening on port: ' + PORT),
    );

} catch (err) {
    throw new Error("Couldn't connect to db", err);
}