const express = require("express");

const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
  res.json({
    message: "Server funzionante!",
  });
});

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
