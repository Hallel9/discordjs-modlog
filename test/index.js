const { Client } = require('discord.js');
const client = new Client();
client.mod = require('discordjs-modlog');
const prefix = '!'
client.on('ready', () => {
	console.log('Ready!');
})

client.mod.setURL('mongodb://localhost:27017/mod-log');

client.on('message', async (message) => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'set-mod-log') {
		const channel = message.mentions.channels.first();

		if (!channel) return message.channel.send('Please specify a channel.');

		await client.mod.setModLog(message.guild.id, channel.id);
		message.channel.send(`Channel has successfully been set to ${channel}`);
 	}
});

client.login('token');