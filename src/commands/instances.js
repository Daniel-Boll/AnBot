module.exports = (message) => {
  return message.channel.send({
    embed: {
      color: "RED",
      description: "Sou uma instancia, pau no cu",
    },
  });
};
