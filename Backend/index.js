import express from "express";

import dotenv from "dotenv";

import cors from "cors";

dotenv.config()

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.status(200).json({
    message: "Everythin is working ok",
  })
);

app.listen(port, () => console.log("Server is listening at port", port));
