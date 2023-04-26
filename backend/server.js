import express from 'express';
import dotenv from 'dotenv';
import PostsRoutes from './routes/posts.js';
import UserRoutes from './routes/users.js';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

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
app.use('/api/post', PostsRoutes);
app.use('/api/user', UserRoutes);

const JWT_SECRET="123goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
app.get("/api/auth", (req, res) => { 
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Not Authorized" });
    }
  
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
  
    try {
      // Verify the token is valid
      // const { user } = jwt.verify(token, process.env.JWT_SECRET);
      const { user } = jwt.verify(token, JWT_SECRET);
      return res.status(200).json({
        message: `Congrats ${user}! You can now accesss the super secret resource`,
      });
    } catch (error) {
      return res.status(401).json({ error: "Not Authorized" });
    }
  });

// connect to db
try {
    mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () =>
        console.log('Connected to db & listening on port: ' + PORT),
    );

} catch (err) {
    throw new Error("Couldn't connect to db", err);
}