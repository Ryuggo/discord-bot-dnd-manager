const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed } = require('discord.js');

const Database = require("@replit/database")
const db = new Database()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup-roll')
		.setDescription('Tweak some settings for when rolling the dices')
		.addIntegerOption(option => option.setName('default').setDescription('Set the default dice to roll for /dice (int)'))
		.addRoleOption(option => option.setName('add-dm').setDescription('Add a role as the Dungeon Master'))
		.addRoleOption(option => option.setName('remove-dm').setDescription('Remove a role from the Dungeon Master'))
		.addBooleanOption(option => option.setName('list-dm').setDescription('Get a list of Dungeon Master\'s roles'))
		,
	async execute(interaction) {
		const defaultDice = interaction.options.getInteger('default');
		const addDm = interaction.options.getRole('add-dm');
		const removeDm = interaction.options.getRole('remove-dm');
		const listDm = interaction.options.getBoolean('list-dm');

		if(defaultDice) {
			await db.set("defaultDice", defaultDice);
			await interaction.reply({ content: 'Default Dice is now : ' + defaultDice, ephemeral: true });
		}
    else if(addDm) {
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
    else if(listDm) {
      const list = await db.get("dm");
      var txt = '';
      list.forEach(id => {
			  txt += '<@&'+ id +'>\n';
		  });
      
  		const embed = new MessageEmbed()
  			.setColor('#0099ff')
  			.setTitle('Dungeon Master\'s roles')
  			.setDescription(list.length > 0 ? txt: 'The list is empty \nUse \'/setup-role add-dm @role\' to add a role');
      
			await interaction.reply({ ephemeral: true, embeds: [embed] });
		}
	},
};