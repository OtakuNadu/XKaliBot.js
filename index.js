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

//Login to Discord
client.login(token);

console.log("\nXKaliBot Main Module is Nominal!")
