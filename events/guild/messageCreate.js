//Pre-requisite JSON files

const fs = require('fs');
var possibleMsgs = JSON.parse(fs.readFileSync('./resources/possibleMsgs.json'));
var responses = JSON.parse(fs.readFileSync('./resources/responses.json'));
var userIDs= JSON.parse(fs.readFileSync('./resources/userIDs.json'));
var channelIDs = JSON.parse(fs.readFileSync('./resources/channelIDs.json'))
console.log("messageCreate.js Event Module is Nominal!")

module.exports = (Discord, client, message) =>{
    //Check if it's me or my fellow bots.
    if (message.author.bot) return;
    
    //Convert all text to lowercase
    msg = message.content.toLowerCase();

    //Welcome reaction
    if (msg.startsWith("wannacum") || msg.startsWith('whalecum')) 
    {
      const squidward = new Discord.MessageAttachment('https://c.tenor.com/2zEJyyQy3GEAAAAC/daring-today-are-we-spongebob.gif');
      message.channel.sendTyping(5);
      message.reply( {content:"Yo! Vannakam!\nFeeling kinky today, aren't we OwO", files : [squidward] } );
    }

     //Hello message
   if (possibleMsgs.hello.includes(msg) == true)
   {
       const asuka_hello = new Discord.MessageAttachment('./resources/media/asuka says hello.mp4');
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
       const hanekawaCatchPhrase = new Discord.MessageAttachment('./resources/media/noob.jpg');
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
       message.reply(responses.cursedcodes[cursedTrigger])
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

   //When someone laughs
   if (message.content.startsWith("<:lmao:477783011094560778>"))
   {
       message.reply('<:lmao:477783011094560778>')
   }

   //When someone poses a question
   //if (msg.includes(possibleMsgs.hmm) == true)
   if (/[!?]$/.test(msg) == true)
   {
       const hmmTrigger = Math.floor(Math.random() * responses.hmm.length)
       message.react(responses.hmm[hmmTrigger])
   }
   
}