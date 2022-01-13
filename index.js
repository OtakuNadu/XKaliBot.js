//Pre-requisites Packages
const {Client, Intents, MessageActionRow, MessageAttachment, DiscordAPIError} = require('discord.js');
require("dotenv").config();
const fs = require('fs');

//Pre-requisite JSON files.
var userIDs= JSON.parse(fs.readFileSync('./resources/userIDs.json'));
var channelIDs = JSON.parse(fs.readFileSync('./resources/channelIDs.json'))
var possibleMsgs = JSON.parse(fs.readFileSync('./resources/possibleMsgs.json'));
var responses = JSON.parse(fs.readFileSync('./resources/responses.json'));

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_PRESENCES]
  });

//Set Bot Secrets and Prefix
const token = process.env.DISCORD_TOKEN
const prefix = "xkali";

//Bot Initiation Prompt
client.on("ready", () => {
    console.log(`Logged into ${client.user.tag}! using Discord.js`);
});

//Set Bot Activity
client.on("ready",() =>{
    client.user.setStatus("I am Master's faithful XKaliber!");

    client.user.setActivity("as my Master's Holy Sword ⚔️ on JS",
    {
        type:"PLAYING"
    })
});

//Member Join Event Prompt

client.on("guildMemberAdd", (member) => {

    const welcome_channel = member.guild.channels.cache.find(ch => ch.name.includes("general"))
    if (!welcome_channel) return;
    welcome_channel.send(`${member.guild.name} Server ku ungalai Anbu illamal varaverkirom <:MingoPepe:502444849442586644>
    Don't forget to initiate cause in the Internet, you can't make friends without initiating!! <:Prayge:865092421344034856> <@${member.id}>!\n`);

});

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
    //Hello message
   if (possibleMsgs.hello.includes(msg) == true)
    {
        const asuka_hello = new MessageAttachment('./resources/media/asuka says hello.mp4');
        message.channel.sendTyping(5);
        message.reply({content:'Halo!',files : [asuka_hello]});
    }

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
        if (responses.shinobu[shinobuTrigger].search("✨") != -1)
        {
            message.reply(`${responses.shinobu[shinobuTrigger]} ${message.author}`)
        }
        else
        {
            message.reply(responses.shinobu[shinobuTrigger])
        }
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
    else if(possibleMsgs.noob.includes(msg) == true && message.author.id != userIDs.master) //Someone else doesn't know a thing
    {
        const noobTrigger = Math.floor(Math.random() * responses.noob.length)
        if (responses.noob[noobTrigger].search("😐") != -1)
        {
            message.reply(`${responses.noob[noobTrigger]} ${message.author}`)
        }
        else
        {
        message.reply(responses.noob[noobTrigger])
        }
    }
    //Someone calls one a pro
    if (possibleMsgs.pro.includes(msg) == true && message.author.id != userIDs.master)
    {
        const proTrigger = Math.floor(Math.random() * responses.pro.length)
        if (responses.pro[proTrigger].search("😐") != -1)
        {
            message.reply(`${responses.pro[proTrigger]} ${message.author}`)
        }
        else
        {
        message.reply(responses.pro[proTrigger])
        }
    }
    
    //Someone mentions cursed content
    if (possibleMsgs.cursedcodes.includes(msg) == true)
    {
        const cursedTrigger = Math.floor(Math.random() * responses.cursedcodes.length)
        message.reply(respones.cursedcodes[cursedTrigger])
    }

    //When Bot Na has something to say
    if (message.channel.name.includes("announcements") && message.author.id == userIDs.botna)
    {
        for (var item = 0; item <responses.botna.length; item++)
        {
            message.react(responses.botna[item])
        }
    }

    //When someone posts an message with an attachment
    if (message.channel.name.includes("announcements") != true && message.attachments.size > 0)
    {
        message.react("⬆️")
        message.react("⬇️")
    }

    if (message.content.startsWith("<:lmao:477783011094560778>"))
    {
        message.reply('<:lmao:477783011094560778>')
    }

    if (possibleMsgs.hmm.includes(msg) == true)
    {
        const hmmTrigger = Math.floor(Math.random() * responses.hmm.length)
        message.react(responses.hmm[hmmTrigger])
    }
    
});




client.login(token);

