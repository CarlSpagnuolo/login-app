require("dotenv").config();

const express = require("express");
const pool = require("./database/db");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());

const PORT = 3001;

const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API funzionante",
  });
});

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
