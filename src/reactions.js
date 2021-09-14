const regras = require("./reactions/rules");

const reactions = { regras };

module.exports = (reaction, user, action) => {
  const channel = reaction.message.channel.name;

  if (reactions.hasOwnProperty(channel))
    reactions[channel](reaction, user, action);
};
