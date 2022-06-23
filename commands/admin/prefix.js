const model = require('../../models/ticket');

module.exports = {
  name: "prefix",
  category: "admin",
  cooldown: 5,
  description: "Shows Bot Response delay and Websocket latency",
  execute: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_GUILD')) return;
    let gelecek = args[0]
    let guild = await model.findOne({ id: message.guild.id })
    if(!guild) {
      new model({
        id: message.guild.id,
        prefix: gelecek
      }).save()
    }
    if(guild){
      await guild.updateOne({ prefix: gelecek})
    }
    
    return message.reply(`Prefix ${gelecek} olarak değiştirildi!`)
  },
};