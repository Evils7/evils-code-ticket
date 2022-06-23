const Discord = require('discord.js')
const cooldowns = new Discord.Collection();
const cmdCooldown = new Map();
const model = require('../../models/ticket')

module.exports = (client) => {

  client.on('messageCreate', async(message) => {
    let guild = await model.findOne({ id: message.guild.id })
    if(message.author.bot) return;
    let prefix = require('../../config.js').prefix;
    if(guild) {
      if(guild.prefix) {
        prefix = guild.prefix
      }
    }
	const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content) || message.author.bot) return;
	const [ , mp ] = message.content.match(prefixRegex);
	const args = message.content.slice(mp.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const cooldownss = cooldowns.get(command.name);
	const amount = command.cooldown * 1000;

	if (cooldownss.has(message.author.id)) {
		const gec = cooldownss.get(message.author.id) + amount;

		if (now < gec) {
			const time = (gec - now) / 1000;
			return message.channel.send(`<@${message.author.id}>, bu komutu kullanmak için **${time.toFixed(2)}** saniye beklemelisin.`)
		}
	}

	cooldownss.set(message.author.id, now);
	setTimeout(() => cooldownss.delete(message.author.id), amount);

	cooldownss.set(message.author.id, now);
	if (!cmdCooldown.has(message.author.id)) cmdCooldown.set(message.author.id, [ Date.now() ]);
	else {
		cmdCooldown.set(message.author.id, cooldownss);
	}

	try {
		command.execute(client, message, args);
	} catch (e) {
		console.log(e);
	}
  })

}