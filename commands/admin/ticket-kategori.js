const model = require('../../models/ticket');

module.exports = {
  name: "ticket-kategori",
  category: "admin",
  cooldown: 5,
  description: "Shows Bot Response delay and Websocket latency",
  execute: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_GUILD')) return;
    let gelecek = message.guild.channels.cache.filter(a => a.type === "GUILD_CATEGORY" && a.id === args[0]).map(a => a.id)
    let guild = await model.findOne({ id: message.guild.id })
    if(!guild) {
      new model({
        id: message.guild.id,
        ticketCategory: gelecek.toString()
      }).save()
    }
    if(guild){
      await guild.updateOne({ ticketCategory: gelecek.toString()})
    }
    
    return message.reply(`Ticket Kategorisi ${gelecek} olarak değiştirildi!`)
  },
};