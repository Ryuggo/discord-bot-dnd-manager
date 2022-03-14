// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const keepAlive = require("./events/server")

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Dynamically retrieve your event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//keepAlive();

// Login to Discord with your client's token
client.login(token);

//https://uptimerobot.com/dashboard#790852736