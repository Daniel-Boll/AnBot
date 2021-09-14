module.exports = (reaction, user, _) => {
  if (reaction._emoji.name == "✅") {
    const role = reaction.message.guild.roles.cache.filter(
      (role) => role.name === "🎮 Gamer"
    );

    // Fetch and store the guild (the server) in which the message was send.
    const guild = reaction.message.guild;

    const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
    
    memberWhoReacted.roles.add(role);
  }
};
