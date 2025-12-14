const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ================= BOT SETUP =================
const BOT_TOKEN = process.env.BOT_TOKEN; // from Render env
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🟢 Ad Dekho & Earn\n\nClick below to watch ad",
    {
      reply_markup: {
        inline_keyboard: [[
          {
            text: "📺 Watch Ad Now",
            web_app: {
              url: "https://adbot-yc1u.onrender.com/ad.html"
            }
          }
        ]]
      }
    }
  );
});

// ================= API =================
const users = {};

app.post("/claim", (req, res) => {
  const { telegramId } = req.body;
  const now = Date.now();

  if (!telegramId) {
    return res.status(400).json({ error: "Invalid user" });
  }

  if (!users[telegramId]) {
    users[telegramId] = { balance: 0, lastClaim: 0 };
  }

  if (now - users[telegramId].lastClaim < 30000) {
    return res.status(400).json({ error: "Ad not completed" });
  }

  users[telegramId].balance += 5;
  users[telegramId].lastClaim = now;

  res.json({
    success: true,
    balance: users[telegramId].balance
  });
});

// ================= SERVER =================
app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
