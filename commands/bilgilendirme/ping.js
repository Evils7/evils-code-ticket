const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: "ping",
  category: "info",
  cooldown: 5,
  description: "Shows Bot Response delay and Websocket latency",
  execute: async (client, message, args) => {
    await message.channel.send("** **").then(sent => {
 
   sent.edit(`Api ${client.ws.ping}ms, RTT: ${Date.now() - sent.createdAt}ms`)
             })
  },
};