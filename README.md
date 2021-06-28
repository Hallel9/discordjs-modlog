discordjs-modlog is a package that makes modlogs even easier to create. 

Usage:

```js
const Discord = require('discord.js');
const client = new Discord.Client();
client.mod = require('discordjs-modlog');
const prefix = '!'

client.mod.setURL('Mongo connection string or you can just put in mongodb://localhost/27017/dbName');

client.on('ready', async () => {
	console.log('Ready!');
});

client.on('message', async (message) => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'set-mod-log') {
		const channel = message.mentions.channels.first();

		if (!channel) return message.channel.send('Please specify a channel');

		client.mod.setModLog(message.guild.id, channel.id);
		message.channel.send(`Channel was set to ${channel}`).catch((e) => console.error(e));
	}
});

// set-mod-log #general

client.login('Your token');
```

Questions?

Add an issue in the github.