//Pre-requisites Packages
const Discord = require('discord.js');
require("dotenv").config();
const fs = require('fs');

//Declare Intents
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_PRESENCES]
  });

//Set Command and Event Handling
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler','event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
}) 

//Set Bot Secrets and Prefix
const token = process.env.DISCORD_TOKEN
const prefix = "xkali";


client.on("guildMemberAdd", (member) => {

    const welcome_channel = member.guild.channels.cache.find(ch => ch.name.includes("general"))
    if (!welcome_channel) return;
    welcome_channel.send(`${member.guild.name} Server ku ungalai Anbu illamal varaverkirom <:MingoPepe:502444849442586644>
    Don't forget to initiate cause in the Internet, you can't make friends without initiating!! <:Prayge:865092421344034856> <@${member.id}>!\n`);

});




client.login(token);

