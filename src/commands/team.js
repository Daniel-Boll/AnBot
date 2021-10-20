const { titleCase } = require("../utils");

const getChannel = (name, guild) => {
  return guild.channels.cache
    .filter((channel) => channel.type === "category" && channel.name == name)
    .first();
};

const createChannel = (teamName, guild) => {
  return new Promise((res, _) => {
    guild.channels
      .create(teamName, {
        type: "category",
        permissionOverwrites: [{ id: guild.id }],
      })
      .then(async (category) => {
        // General Text
        await guild.channels.create(teamName, {
          type: "text",
          parent: category,
          permissionOverwrites: [{ id: guild.id }],
        });
        //General Voice
        await guild.channels.create(teamName, {
          type: "voice",
          parent: category,
          permissionOverwrites: [{ id: guild.id }],
        });
        // Art Text Channel
        await guild.channels.create("🎨 Arte", {
          type: "text",
          parent: category,
          permissionOverwrites: [{ id: guild.id }],
        });
        // Dev Text Channel
        await guild.channels.create("💻 Desenvolvimento", {
          type: "text",
          parent: category,
          permissionOverwrites: [{ id: guild.id }],
        });
        // Music Text Channel
        await guild.channels.create("🎵 Música", {
          type: "text",
          parent: category,
          permissionOverwrites: [{ id: guild.id }],
        });

        category.updateOverwrite(guild.roles.everyone, { VIEW_CHANNEL: false });
        res(category);
      })
      .catch((error) => console.error(error));
  });
};

const extractName = (name) => {
  let completed = false;
  let placeholder = "";

  while (!completed) {
    const current = name.shift();
    if (current.includes("]")) completed = true;
    placeholder += current.match(/[a-z0-9]+/gi)[0] + " ";
  }

  // Taking the last " " space that has been added
  return placeholder.slice(0, -1);
};

module.exports = async (message, tokens) => {
  const teamName = titleCase(
    tokens[0].includes("[") ? extractName(tokens) : tokens.shift()
  );

  const teamMembers = [...tokens];

  const alreadyExist = Array.from(
    message.channel.guild.channels.cache.filter(
      (channel) => channel.type === "category" && channel.name === teamName
    )
  );

  const theTeam = !!alreadyExist.length
    ? getChannel(teamName, message.channel.guild)
    : await createChannel(teamName, message.channel.guild);

  for (member of teamMembers) {
    // Adding members to channel
    theTeam.updateOverwrite(member.replace(/[^\d]/g, ""), {
      VIEW_CHANNEL: true,
    });

    console.log(`Member: ${member} has been added to ${teamName}`);
  }
};
