const model = require('../../models/ticket');

module.exports = {
  name: "ticket-mod",
  category: "admin",
  cooldown: 5,
  description: "Shows Bot Response delay and Websocket latency",
  execute: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_GUILD')) return;
    let gelecek = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    let guild = await model.findOne({ id: message.guild.id })
    if(!guild) {
      new model({
        id: message.guild.id,
        ticketMod: gelecek.id
      }).save()
    }
    if(guild){
      await guild.updateOne({ ticketMod: gelecek.id})
    }
    
    return message.reply(`Ticket Yetkilisi ${gelecek} olarak değiştirildi!`)
  },
};