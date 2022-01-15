//Pre-requisite JSON files
const fs = require('fs');
var possibleMsgs = JSON.parse(fs.readFileSync('./resources/possibleMsgs.json'));
var responses = JSON.parse(fs.readFileSync('./resources/responses.json'));
var userIDs= JSON.parse(fs.readFileSync('./resources/userIDs.json'));
var channelIDs = JSON.parse(fs.readFileSync('./resources/channelIDs.json'))
var config = JSON.parse(fs.readFileSync('./resources/config.json'));
console.log("\nmessageCreate.js Event Module is Nominal!")

module.exports = (Discord, client, message) =>{
    //Check if it's me or my fellow bots.
    if (message.author.bot) return;
    
    //Convert all text to lowercase
    msg = message.content.toLowerCase();

    //Command parsing 
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!cmd && message.content.indexOf(config.prefix) !== 0)
    {
    //Welcome reaction
    if (msg.startsWith("wannacum") || msg.startsWith('whalecum')) 
    {
      try{
      const squidward = new Discord.MessageAttachment('https://c.tenor.com/2zEJyyQy3GEAAAAC/daring-today-are-we-spongebob.gif');
      message.channel.sendTyping(5);
      message.reply( {content:"Yo! Vannakam!\nFeeling kinky today, aren't we OwO", files : [squidward] } );
      } catch (e) {
        message.reply("Ummm, My brain farted there, Could you try again or check with master if this repeats?")
     } finally {
      return
    }
    }

     //Hello message
   if (possibleMsgs.hello.includes(msg) == true)
   {  
       try{
       const asuka_hello = new Discord.MessageAttachment('./resources/media/asuka says hello.mp4');
       message.channel.sendTyping(5);
       message.reply({content:'Halo!',files : [asuka_hello]});
       } catch (e) {
        message.reply("Ummm, My brain farted there, Could you try again or check with master if this repeats?")
     } finally {
      return
    }
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
       try{
       const hanekawaCatchPhrase = new Discord.MessageAttachment('./resources/media/noob.jpg');
       message.reply({content:"Master doesn\'t know everything, He only knows what he knows.", files :[hanekawaCatchPhrase]});
       } catch (e) {
          message.reply("Ummm, My brain farted there, Could you try again or check if something is wrong with me?")
       } finally {
        return
      }
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

   //When someone says the funny number
   if (msg.includes('69'))
   {
       const sixnineTrigger = Math.floor(Math.random() * responses.sixnine.length)
       message.reply(responses.sixnine[sixnineTrigger])
   }

   if(possibleMsgs.kira.includes(msg))
   {
       const kiraTrigger = Math.floor(Math.random() * responses.kira.length)
       message.reply(responses.kira[kiraTrigger])
   }

    } else{
        try{
            if(message.content.startsWith(config.prefix))
            {
             if (command) command.execute(client, message, args, Discord);
            }

    } catch (err)
    {
        console.log(err);
        message.channel.send(`I caught a bug! <@${userIDs.master}>`)
    }

    }
   
}