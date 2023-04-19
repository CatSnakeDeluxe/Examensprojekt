import express from 'express';
import dotenv from "dotenv";
import RegisterRouter from "./routes/RegisterRoute.js";
import bodyParser from 'body-parser';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Have Node serve the files for our built React app
app.use(express.static('../frontend/build'));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// app.post('/demo', (req, res) => {
//   console.log(req)
//   // Retrieve the data from the request body
//   // const { name, email } = req.body;
  
//   // // Do something with the data (e.g. store it in a database)
//   // console.log(`Received data from ${name} with email ${email}`);
  
//   // // Send a response back to the client
//   res.send('Data received successfully');
// });

// app.use('/register', RegisterRouter);
app.use('/api/register', RegisterRouter);

app.listen(PORT, () =>
  console.log('listening on ' + PORT),
);