const model = require('../../models/ticket');

module.exports = {
  name: "ticket-baslat",
  category: "admin",
  cooldown: 5,
  description: "Shows Bot Response delay and Websocket latency",
  execute: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_GUILD')) return;
   
    let guild = await model.findOne({ id: message.guild.id })
    if(!guild) return;
    if(!guild.ticketChannel) return;
    if(!guild.ticketMod) return;
    if(!guild.ticketCategory) return;
    
    let dc = require('discord.js')
    let row = new dc.MessageActionRow()
    .addComponents(
    new dc.MessageButton()
      .setStyle('SUCCESS')
      .setEmoji('🎟')
      .setLabel('Ticket Oluşturmak İçin Tıkla')
      .setCustomId('ticket-menu')
    )
    let ch = message.guild.channels.cache.get(guild.ticketChannel)
    let e = new dc.MessageEmbed()
    .setColor('BLURPLE')
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()})
    .setFooter({ text: message.guild.name+' | Ticket Sistemi', iconURL: message.guild.iconURL()})
    .setDescription(`Ticket oluşturmak için aşşağıdaki butona bas.`)
    
    await ch.send({ embeds:[e], components:[row]})
    },
};