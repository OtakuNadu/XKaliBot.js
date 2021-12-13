//Pre-requisites
const {Client, Intents, MessageActionRow, MessageAttachment} = require('discord.js');
require("dotenv").config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  });

//Set Bot Secrets and Prefix
const token = process.env.DISCORD_TOKEN
const prefix = "xkali";

//Bot Initiation Prompt
client.on("ready", () => {
    console.log(`Logged into ${client.user.tag}! using Discord.js`);
});

//Member Join Event Prompt

//client.on("guildMemberAdd", (member) => {
//
//    const welcome_channel = member.guild.channels.cache.find(channel => channel.name.includes("general"))
//    if (!welcome_channel) return;
//    welcome_channel.send(`${guild.name} Server ku ungalai Anbu illamal varaverkirom <:MingoPepe:502444849442586644>
//    Don't forget to initiate cause in the Internet, you can't make friends without initiating!! <:Prayge:865092421344034856> <@${member.id}>!\n`);
//
//});

//Bot Message Replies

client.on("messageCreate", (message) => {
    
    if (message.author.bot) return;
    
    msg = message.content.toLowerCase();

    if (msg.startsWith("wannacum") || msg.startsWith('whalecum')) 
    {
      const squidward = new MessageAttachment('https://c.tenor.com/2zEJyyQy3GEAAAAC/daring-today-are-we-spongebob.gif');
      message.channel.sendTyping(5);
      message.reply( {content:"Yo! Vannakam!\nFeeling kinky today, aren't we OwO", files : [squidward] } );
    }

    if (msg.startsWith(asuka_hello_trigger))
    {

        const asuka_hello = new MessageAttachment('./resources/media/asuka says hello.mp4');
        message.channel.sendTyping(5);
        message.reply({content:'Halo!',files : [asuka_hello]});
    }

    if (msg.startsWith('i iz noob') && message.author.id == client.users.cache.find(u => u.tag === 'master').id)
    {
        message.reply("It's okay master")
    }



  

});



client.login(token);

