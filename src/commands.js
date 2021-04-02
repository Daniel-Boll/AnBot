const equipe = require("./commands/team");
const many = require("./commands/instances");

const commands = { equipe, many };

module.exports = (message) => {
  const tokens = message.content.split(" ");
  const command = tokens.shift().substring(1);

  try {
    commands[command](message, tokens);
  } catch (err) {
    console.error(err);
  }
};
