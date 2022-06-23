const { Client, Intents, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose')

const client = new Client({ intents: 32767 });

mongoose.connect(`mongodb+srv://EvilsMongoAdmin:${process.env.MONGO_PASS}@evilscluster.glxdtjq.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log('MongoDBye bağlanıldı'))


client.commands = new Collection();
client.aliases = new Collection();
fs.readdirSync("./commands/").forEach(d => {
const cmds = fs.readdirSync(`./commands/${d}/`).filter(file => file.endsWith(".js"));
for (let f of cmds) {
let cmd = require(`./commands/${d}/${f}`);
if (cmd.name) client.commands.set(cmd.name, cmd);
else continue;
if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));}});

fs.readdirSync("./events/").forEach(d => { 
const events = fs.readdirSync(`./events/${d}/`).filter(file => file.endsWith(".js"));
for (let f of events) {
require(`./events/${d}/${f}`)(client)};
});

client.login();