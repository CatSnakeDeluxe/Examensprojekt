import express from 'express';
import dotenv from "dotenv";
import RegisterRouter from "./routes/RegisterRoute.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Have Node serve the files for our built React app
app.use(express.static('../frontend/build'));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!123" });
});

app.use('/register', RegisterRouter);

app.listen(PORT, () =>
  console.log('listening on ' + PORT),
);