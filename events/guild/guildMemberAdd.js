console.log("guildMemberAdd.js Event Module is Nominal!")
module.exports = (Discord, client, member) =>{
    const welcome_channel = member.guild.channels.cache.find(ch => ch.name.includes("general"))
    if (!welcome_channel) return;
    welcome_channel.send(`${member.guild.name} Server ku ungalai Anbu illamal varaverkirom <:MingoPepe:502444849442586644> <@${member.id}>!\n
    Don't forget to initiate cause in the Internet, you can't make friends without initiating!! <:Prayge:865092421344034856>`);
}
