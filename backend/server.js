import express from 'express';
import dotenv from 'dotenv';
import PostRoutes from './routes/posts.js';
import UserRoutes from './routes/users.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postController from './controllers/postController.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: `http://localhost:3000`,
//     methods: ['GET', 'POST', 'PUT']
//   }
// });

// io.on("connection", (socket) => {
//   console.log("SERVER socket connected");

//   socket.on('notification', (data) => {
//     postController.likePost(socket)(data, null); // Call the likePost function with the socket and null for req and res
//   });

//   socket.on("disconnect", () => {
//     console.log("DISCONNECTED");
//   });
// });

// io.listen(4000);

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