const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed } = require('discord.js');

const Database = require("@replit/database")
const db = new Database()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup-character')
		.setDescription('Edit Character Sheet')
		.addBooleanOption(option => option.setName('show').setDescription('Show the actual sheet'))
		.addIntegerOption(option => option.setName('row').setDescription('Select the row'))
		.addIntegerOption(option => option.setName('column').setDescription('Select the column'))
		.addBooleanOption(option => option.setName('create').setDescription('Create a stat'))
		.addBooleanOption(option => option.setName('edit').setDescription('Edit the stat'))
		.addBooleanOption(option => option.setName('remove').setDescription('Remove the stat'))
		,
	async execute(interaction) {
		const show = interaction.options.getBoolean('show');
		const row = interaction.options.getInteger('row');
		const column = interaction.options.getInteger('column');
		const create = interaction.options.getBoolean('create');
		const edit = interaction.options.getBoolean('edit');
		const remove = interaction.options.getBoolean('remove');

		if(show) {
      const list = await db.get("character"+interaction.member.guild.id);
      var txt = '';
      list.forEach(id => {
			  txt += '<@&'+ id +'>\n';
		  });
      
  		const embed = new MessageEmbed()
  			.setColor('#0099ff')
  			.setTitle('Character\'s Sheet')
  			.setDescription(list.length > 0 ? txt: 'The list is empty \nUse \'/setup-role add-dm @role\' to add a role');
      
			await interaction.reply({ ephemeral: true, embeds: [embed] });
		}
		else if(row != null & column != null) {
    	if(create) {
				db.get("dm").then(dm => {
	        if(dm != null)
					  dm.push([addDm.id]);
	        else
	          dm = [addDm.id];
					db.set("dm", dm);
				})
				await interaction.reply({ content: 'Role <@&'+ addDm.id +'> added!', ephemeral: true });
			}
	    else if(removeDm) {
				db.get("dm").then(dm => {
	        dm.splice(dm.indexOf(removeDm), 1)
	        db.set("dm", dm);
				})
				await interaction.reply({ content: 'Role <@&'+ removeDm.id +'> removed!', ephemeral: true });
			}
	    else if(edit) {
			}
	    else if(remove) {
			}
		}
	},
};