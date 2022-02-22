const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed } = require('discord.js');

const sheet = require("../functions/sheet.js")

const Database = require("@replit/database")
const db = new Database()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup-character')
		.setDescription('Edit Character Sheet')
	/*
		.addIntegerOption(option => option.setName('row').setDescription('Select the row'))
		.addIntegerOption(option => option.setName('column').setDescription('Select the column'))
		.addBooleanOption(option => option.setName('create').setDescription('Create a stat'))
		.addBooleanOption(option => option.setName('edit').setDescription('Edit the stat'))
		.addBooleanOption(option => option.setName('remove').setDescription('Remove the stat'))
	*/
		,
	async execute(interaction) {
		if(interaction.member.user.id == interaction.member.guild.ownerId) {
			/*
			const row = interaction.options.getInteger('row');
			const column = interaction.options.getInteger('column');
			const create = interaction.options.getBoolean('create');
			const edit = interaction.options.getBoolean('edit');
			const remove = interaction.options.getBoolean('remove');

			if(row != null & column != null) {
	    	if(create) {
				}
		    else if(removeDm) {
				}
		    else if(edit) {
				}
		    else if(remove) {
				}
				else {
*/
		      const bd = await db.get(interaction.member.guild.id);
					
					if(bd["sheet"]) {
			      const embeds = sheet.Display(bd["sheet"], null, null);
						
						await interaction.reply({ content: '```Markdown\n# Character\'s Sheet```', ephemeral: true, embeds: embeds });
					}
/*
			}
		}
*/
		} else {
			await interaction.reply({ content: 'You must be the server\'s owner to use this command', ephemeral: true });
		}
	},
};

