const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

		// Slash Commands
		if (interaction.isCommand()) {
			interaction.client.commands = new Collection();
			const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const command = require(`../commands/${file}`);
				// Set a new item in the Collection
				// With the key as the command name and the value as the exported module
				interaction.client.commands.set(command.data.name, command);
			}

			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		} else if(interaction.isButton()) {
			interaction.client.button = new Collection();
			const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

			for (const file of buttonFiles) {
				const button = require(`../buttons/${file}`);
				interaction.client.button.set(button.data.label, button);
			}

			const button = interaction.client.button.get(interaction.customId);
			if (!button) return;

			try {
				button.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		} else if(interaction.isSelectMenu()) {
			interaction.client.select = new Collection();
			const selectFiles = fs.readdirSync('./selects').filter(file => file.endsWith('.js'));

			for (const file of selectFiles) {
				const select = require(`../selects/${file}`);
				interaction.client.select.set(select.data.custom_id, select);
			}

			const select = interaction.client.select.get(interaction.values[0]);
			if (!select) return;

			try {
				/* Doesn't work :	Interaction has already been acknowledged.
				interaction.values.forEach(i => {
					const select = interaction.client.select.get(i);
					if (!select) return;

					select.execute(interaction);
				});
				*/
				select.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};