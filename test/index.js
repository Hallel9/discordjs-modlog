const { Client } = require('discord.js');
const client = new Client();
client.mod = require('discordjs-modlog');
const prefix = '!'
client.on('ready', () => {
	console.log('Ready!');
})

client.on('message', async (message) => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
})