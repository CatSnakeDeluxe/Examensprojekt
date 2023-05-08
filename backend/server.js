import express from 'express';
import dotenv from 'dotenv';
import PostRoutes from './routes/posts.js';
import UserRoutes from './routes/users.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('public/uploads'));

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(cors());

// routes
app.use('/api/post', PostRoutes);
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