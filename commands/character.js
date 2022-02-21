const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const DB = require("../functions/initDB.js")

const Database = require("@replit/database")
const db = new Database()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Create and Manage Characters for the tabletop RPG')
		.addUserOption(option => option.setName('show').setDescription('Show someone\'s Characters'))
		.addIntegerOption(option => option.setName('select').setDescription('Select a character to use its stats'))
		.addStringOption(option => option.setName('create').setDescription('Create a Character'))
		.addStringOption(option => option.setName('edit').setDescription('Edit one of your Character'))
		.addStringOption(option => option.setName('list').setDescription('Show all of your Characters'))
		.addStringOption(option => option.setName('remove').setDescription('Remove one of your Characters'))
		,
	async execute(interaction) {
		const showCh = interaction.options.getUser('show');
		const selectCh = interaction.options.getInteger('select');
		const createCh = interaction.options.getString('create');
		const editCh = interaction.options.getString('edit');
		const listCh = interaction.options.getString('list');
		const removeCh = interaction.options.getString('remove');

		DB.InitDB(interaction);

		const row = new MessageActionRow();
		if (showCh) {
			
			//await interaction.reply({ content: 'Select a dice to roll!', ephemeral: true, components: [row] });
		}
    else if(selectCh) {
	
			//await interaction.reply({ embeds: [embed], components: [row] });
    }
    else if(createCh) {
			
			//await interaction.reply({ content: txt, ephemeral: hidden });
		}
    else if(editCh) {
			
			//await interaction.reply({ content: txt, ephemeral: hidden });
		}
    else if(listCh) {
			//interaction.member.user.id
			db.get("characters").then(def => {
			  if (!def) {
			    db.set("characters", 100);
			  }
			})
			//await interaction.reply({ content: txt, ephemeral: hidden });
		}
    else if(removeCh) {
			
		}	
	},
};