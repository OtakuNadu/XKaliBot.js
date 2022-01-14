console.log('\nready.js Event Module is Nominal!')
module.exports = (Discord, client) =>{
        console.log(`\nLogged into ${client.user.tag}! using Discord.js`);

        client.user.setStatus("I am Master's faithful XKaliber!");
    
        client.user.setActivity("as my Master's Holy Sword ⚔️ on JS",
        {
            type:"PLAYING"
        })
    
}