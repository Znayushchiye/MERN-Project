import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//Middleware
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow All Origins with default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(
//    cors({
//       origin: 'http://localhost:3000',
//       methods: ['GET', 'POST', 'PUT', 'DELETE'],
//       allowedHeaders: ['Content-Type'],
//    })
//);

app.get('/', (req, res) => {
   console.log(req);
   return res.status(234).send("Test response");
});

app.use('/books', booksRoute);

// Connect to MongoDB Atlas database
mongoose
   .connect(mongoDBURL)
   .then(() => {
      console.log("App connected to database");

      //Create server only if DB connects
      app.listen(PORT, () => {
         console.log(`App is listening on port: ${PORT}`);
      });
   })
   .catch((error) => {
      console.log(error);
   });