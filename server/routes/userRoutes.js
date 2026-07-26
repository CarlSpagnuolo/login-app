const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../database/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword],
    );

    const user = result.rows[0];

    res.json({
      message: "Utente creato con successo",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Errore registrazione",
    });
  }
});

module.exports = router;
