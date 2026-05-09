import express from "express";
// import { notFound } from "./errorHandling/errorHandling";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', async (_req, res) => {
  try {
    res.status(200).json({message:'customer details api is running successfully.'});
  } catch (error) {
    res.json({message:'something went wrong'})
  }
});

// app.use(notFound)