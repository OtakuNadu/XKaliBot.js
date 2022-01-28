const { MessageEmbed } = require("discord.js");
const fs = require('fs');
var userIDs= JSON.parse(fs.readFileSync('./resources/userIDs.json'));
var config = JSON.parse(fs.readFileSync('./resources/config.json'));

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  async execute(client, message, args){


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      if (message.author.id == userIDs.master)
      {
      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${config.prefix}help\` followed by a command name to get more additional information on a command. For example: \`${config.prefix}help ban\`.`
        )
        .setFooter(
          `I am glad to serve you my Honorable Master ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
        await message.channel.send(embed);
        } 
        
        else if(message.author.id != userIDs.master)
        {
        const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${config.prefix}help\` followed by a command name to get more additional information on a command. For example: \`${config.prefix}help ban\`.`
        )
        .setFooter(
          `Idha keta namma muta payan namma ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
        await message.channel.send(embed);    
        }
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${config.prefix}help\` for all of my commands!`)
          .setColor("FF0000");
           await message.channel.send(embed);
      }

      if (message.author.id == userIDs.master)
      {
      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${config.prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${config.prefix}${command.name} ${command.usage}\``
            : `\`${config.prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
        await message.channel.send(embed);
        } else if (message.author.id != userIDs.master)
        {
            const embed = new MessageEmbed()
            .setTitle("Command Details:")
            .addField("PREFIX:", `\`${config.prefix}\``)
            .addField(
              "COMMAND:",
              command.name ? `\`${command.name}\`` : "No name for this command."
            )
            .addField(
              "ALIASES:",
              command.aliases
                ? `\`${command.aliases.join("` `")}\``
                : "No aliases for this command."
            )
            .addField(
              "USAGE:",
              command.usage
                ? `\`${config.prefix}${command.name} ${command.usage}\``
                : `\`${config.prefix}${command.name}\``
            )
            .addField(
              "DESCRIPTION:",
              command.description
                ? command.description
                : "No description for this command."
            )
            .setFooter(
              `Requested by ${message.author.tag}`,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()
            .setColor(roleColor);
           await message.channel.send(embed);
        }
    }
  },
};