module.exports = (Discord, client) =>{
        console.log(`Logged into ${client.user.tag}! using Discord.js`);
        console.log('ready.js is Nominal!')

        client.user.setStatus("I am Master's faithful XKaliber!");
    
        client.user.setActivity("as my Master's Holy Sword ⚔️ on JS",
        {
            type:"PLAYING"
        })
    
}