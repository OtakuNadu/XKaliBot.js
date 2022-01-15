console.log("\necho.js Command Module is Nominal!")
module.exports = {
    name: "echo",
    category: "general",
    description: "Repeats what you said to me secretly, out loud!",
    usage: "xkali echo",
    async execute(client, message){
        try{
        content = message.content
        content = content.substr(content.indexOf(" ")+6);
        await message.channel.send(content);
        await message.delete(message.channel.lastMessage);
        } catch (err){
            await message.channel.send("Umm, that didn't work as expected.")
        }

    }
};