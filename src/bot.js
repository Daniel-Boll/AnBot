require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const commandHandler = require("./commands");
//const reactionHandler = require("./reactions");

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  //TODO: set bot to be playing something
});

client.on("message", (message) => {
  if (message.content.startsWith("!")) {
    commandHandler(message);
  }
});
