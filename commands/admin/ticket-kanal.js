const model = require('../../models/ticket');

module.exports = {
  name: "ticket-kanal",
  category: "admin",
  cooldown: 5,
  description: "Shows Bot Response delay and Websocket latency",
  execute: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_GUILD')) return;
    let gelecek = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    let guild = await model.findOne({ id: message.guild.id })
    if(!guild) {
      new model({
        id: message.guild.id,
        ticketChannel: gelecek.id
      }).save()
    }
    if(guild){
      await guild.updateOne({ ticketChannel: gelecek.id})
    }
    
    return message.reply(`Ticket Kanalı ${gelecek} olarak değiştirildi!`)
  },
};