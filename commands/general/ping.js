
console.log('\nping.js Command Module is Nominal!')
module.exports = {
        name: "ping",
        category: "general",
        aliases : ['🏓'],
        description: "Calculates the ping time between me and you!",
        usage: "xkali ping",
        async execute(client, message){
             await message.reply(`🏓 pong! Your ball reached me in **${Date.now() - message.createdTimestamp}** ms on JS`);

    }
}; 