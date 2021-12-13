const {Client, Intents, MessageActionRow} = require('discord.js');
require("dotenv").config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  });

const token = process.env.DISCORD_TOKEN
const prefix = "xkali";

client.on("ready", () => {
    console.log(`Logged into ${client.user.tag}! using Discord.js`);
});

client.on("messageCreate", (message) => {
    
    if (message.author.bot) return;
    
    msg = message.content.toLowerCase();

    if (msg.startsWith("wannacum") || msg.startsWith('whalecum')) 
    {
      message.reply("Feeling kinky today, aren't we \n https://tenor.com/view/daring-today-are-we-spongebob-squidward-gif-22508233");
    }
  

});



client.login(token);

