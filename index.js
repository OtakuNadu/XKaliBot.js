//Pre-requisites
const {Client, Intents, MessageActionRow, MessageAttachment} = require('discord.js');
require("dotenv").config();
const fs = require('fs');
var userIDs= JSON.parse(fs.readFileSync('./resources/userIDs.json'));
var possibleMsgs = JSON.parse(fs.readFileSync('./resources/possibleMsgs.json'));
var responses = JSON.parse(fs.readFileSync('./resources/responses.json'));

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
    
    //Check if it's me or my fellow bots.
    if (message.author.bot) return;
    
    //Convert all text to lowercase
    msg = message.content.toLowerCase();

    //Welcome reaction
    if (msg.startsWith("wannacum") || msg.startsWith('whalecum')) 
    {
      const squidward = new MessageAttachment('https://c.tenor.com/2zEJyyQy3GEAAAAC/daring-today-are-we-spongebob.gif');
      message.channel.sendTyping(5);
      message.reply( {content:"Yo! Vannakam!\nFeeling kinky today, aren't we OwO", files : [squidward] } );
    }

   // if (msg.startsWith(asuka_hello_trigger))
    //{

     //   const asuka_hello = new MessageAttachment('./resources/media/asuka says hello.mp4');
     //   message.channel.sendTyping(5);
     //   message.reply({content:'Halo!',files : [asuka_hello]});
   // }

    //Bot Trigger when Mentioned
    if (message.mentions.has(client.user) && message.author.id != userIDs.master)
    { 
        const tagTrigger = Math.floor(Math.random() * responses.botTag.length)
        message.reply(responses.botTag[tagTrigger])
    }

    //Shinobu appreciation
    if (possibleMsgs.shinobu.includes(msg) == true)
    {
        const shinobuTrigger = Math.floor(Math.random() * responses.shinobu.length)
        message.reply(responses.shinobu[shinobuTrigger])
    }

    //When someone acts dumb
    if (msg.startsWith("probably") && message.author.id != userIDs.master)
    {
        message.reply("Yes or No, No probably dip shit plz.")
    }
    else if (msg.startsWith("probably") && message.author.id == userIDs.master) //When master isn't sure.
    {
        message.reply("It\'s okay Master therinja matum sollunga 😌✨")
    }

    //When master doesn't know a thing
    if (possibleMsgs.noob.includes(msg) == true && message.author.id == userIDs.master)
    {
        const hanekawaCatchPhrase = new MessageAttachment('./resources/media/noob.jpg');
        message.reply({content:"Master doesn\'t know everything, He only knows what he knows.", files :[hanekawaCatchPhrase]});
    }
    else if(possibleMsgs.noob.includes(msg) == true && message.author.id != userIDs.master)
    {
        const noobTrigger = Math.floor(Math.random() * responses.noob.length)
        message.reply(responses.noob[noobTrigger])
    }

});



client.login(token);

