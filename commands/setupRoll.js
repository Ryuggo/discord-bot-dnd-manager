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
			let bd = await db.get(interaction.member.guild.id);
			bd["defaultDice"] = defaultDice;
			await db.set(interaction.member.guild.id, bd);
			await interaction.reply({ content: 'Default Dice is now : ' + defaultDice, ephemeral: true });
		}
    else if(addDm) {
			db.get(interaction.member.guild.id).then(bd => {
        if(bd["dm"] != null)
				  bd["dm"].push(addDm.id);
        else
          bd["dm"] = addDm.id;
				db.set(interaction.member.guild.id, bd);
			})
			await interaction.reply({ content: 'Role <@&'+ addDm.id +'> added!', ephemeral: true });
		}
    else if(removeDm) {
			db.get(interaction.member.guild.id).then(bd => {
        bd["dm"].splice(bd["dm"].indexOf(removeDm), 1)
        db.set(interaction.member.guild.id, bd);
			})
			await interaction.reply({ content: 'Role <@&'+ removeDm.id +'> removed!', ephemeral: true });
		}
    else if(listDm) {
      const bd = await db.get(interaction.member.guild.id);
			if(bd["dm"]) {
	      var txt = '';
	      bd["dm"].forEach(id => {
				  txt += '<@&'+ id +'>\n';
			  });
			}
	  		const embed = new MessageEmbed()
	  			.setColor('#0099ff')
	  			.setTitle('Dungeon Master\'s roles')
	  			.setDescription(bd["dm"].length > 0 && bd["dm"] ? txt: 'The list is empty \nUse \'/setup-role add-dm @role\' to add a role');
	      
				await interaction.reply({ ephemeral: true, embeds: [embed] });
		}
	},
};