const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot("8410003993:AAHK8WRtbihTm3DzGCJ3wjR23zoAYf2J2mo", { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    "🟢 Ad Dekho & Earn\n\nClick below to watch ad",
    {
      reply_markup: {
        inline_keyboard: [[
          {
            text: "📺 Watch Ad Now",
            web_app: { url: "http://localhost:3000/ad.html" }
          }
        ]]
      }
    }
  );
});