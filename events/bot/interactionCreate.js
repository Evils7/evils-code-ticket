const model = require('../../models/ticket')
const discord = require('discord.js')

module.exports = async(client) => {
  client.on('interactionCreate', async(interaction) => {
    if(interaction.isButton()) {
      if(interaction.customId === "kapat-ticket") {
        interaction.reply(`Ticket <@${interaction.user.id}> tarafından kapatılıyor`).then(() => {
      if(interaction.channel.name.toString().startsWith("destek-")) {
          interaction.channel.delete()
        }
        })
      }
      if(interaction.customId === "ticket-menu") {
        await interaction.reply({ content:`Senin için bir ticket kanalı oluşturdum!`, ephemeral: true})
        let guild = await model.findOne({ id: interaction.guild.id })
        if(!guild) return;
        interaction.guild.channels.create(`destek-${guild.tickets.length}`, {
          parent: guild.ticketCategory,
          permissionOverwrites: [{
					id: `${interaction.guild.id}`,
					deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
				}, {
					id: `${interaction.user.id}`,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
				}, {
					id: guild.ticketMod,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
				}]
        }).then(async(channel) => {
          let dsa = new discord.MessageActionRow()
          .addComponents(
          new discord.MessageButton()
            .setCustomId('kapat-ticket')
            .setStyle('SECONDARY')
            .setLabel(`Ticket'ı Kapat`)
            .setEmoji('🔒')
          )
          await channel.send({ content:`<@${interaction.user.id}> Bir Ticket Başlattı ilgilenmeniz bekleniyor.`, components:[dsa]})
        })
        await guild.updateOne({
				$push: {
					tickets: {
						ticket: {
              user: interaction.user.id,
							case_id: guild.tickets.length
						}
					}
				}
			})
      }
    }
  })
}