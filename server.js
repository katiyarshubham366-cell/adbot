const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const users = {};

app.post("/claim", (req, res) => {
  const { telegramId } = req.body;
  const now = Date.now();

  if (!users[telegramId]) {
    users[telegramId] = { balance: 0, lastAd: 0 };
  }

  if (now - users[telegramId].lastAd < 30000) {
    return res.status(400).json({ error: "Ad not completed" });
  }

  users[telegramId].balance += 5;
  users[telegramId].lastAd = now;

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running"));