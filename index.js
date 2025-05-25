const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.login(token);

let data = JSON.parse(fs.readFileSync("./count.json", "utf-8"));

const targetWord = "kek";

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes(targetWord)) {
    data.kekcount = data.kekcount + 1;
    fs.writeFileSync("./count.json", JSON.stringify(data, null, 2), "utf-8");
    console.log(`"${targetWord}" wurde ${data.kekcount} Mal geschrieben,`);

    try {
      const channel = await client.channels.fetch("1376207291480670289");

      if (channel && channel.isTextBased()) {
        await channel.send(
          `Es wurde **${data.kekcount}** mal Kek geschrieben!`
        );
      }
    } catch (err) {
      console.error("Fehler beim Senden in den Channel", err);
    }
  }
});
