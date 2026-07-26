const express = require("express");
const pool = require("./database/db");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    const users = result.rows.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    }));

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Errore database",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
