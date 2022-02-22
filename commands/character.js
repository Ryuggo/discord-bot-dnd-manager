const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const sheet = require("../functions/sheet.js")

const Database = require("@replit/database")
const db = new Database()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Create and Manage Characters for the tabletop RPG')
		.addUserOption(option => option.setName('show').setDescription('Show someone\'s Characters'))
		.addIntegerOption(option => option.setName('select').setDescription('Select a character to use its stats'))
		.addStringOption(option => option.setName('create').setDescription('Create a Character (Name=value+Sex=value+...)'))
		.addStringOption(option => option.setName('edit').setDescription('Edit one of your Character'))
		.addBooleanOption(option => option.setName('list').setDescription('Show all of your Characters'))
		.addStringOption(option => option.setName('remove').setDescription('Remove one of your Characters'))
		,
	async execute(interaction) {
		const showCh = interaction.options.getUser('show');
		const selectCh = interaction.options.getInteger('select');
		const createCh = interaction.options.getString('create');
		const editCh = interaction.options.getString('edit');
		const listCh = interaction.options.getBoolean('list');
		const removeCh = interaction.options.getString('remove');

		const row = new MessageActionRow();
		if (showCh) {
			
			//await interaction.reply({ content: 'Select a dice to roll!', ephemeral: true, components: [row] });
		}
    else if(selectCh) {
	
			//await interaction.reply({ embeds: [embed], components: [row] });
    }
    else if(createCh) {
			db.get(interaction.member.user.id).then(async chars => {
				if(!chars) {
					chars = { "charSelected": 0, "sheets": [] };
				}
				const bd = await db.get(interaction.member.guild.id);
				
				const tmp = createCh.split('+');
				let map = new Map();
				tmp.forEach(t => {
					const tmp2 = t.split('=');
					map.set(tmp2[0], tmp2[1]);
				})
				sheets = sheet.Update(bd["sheet"], map);
				
				chars["sheets"].push(sheets)
				
				db.set(interaction.member.user.id, chars);
				
				const embeds = sheet.Display(sheets, null, null);
				await interaction.reply({ content: '```Markdown\n# Character\'s Sheet```', ephemeral: true, embeds: embeds });
			})
		}
    else if(editCh) {
			
			//await interaction.reply({ content: txt, ephemeral: hidden });
		}
    else if(listCh) {
			const bd = await db.get(interaction.member.user.id);
			let embeds = [];
			if (bd["sheets"]) {
				bd["sheets"].forEach(sheets => {
					embeds = sheet.Display(sheets, null, "Character");
				});
			}
			await interaction.reply({ content: '```Markdown\n# Character\'s Sheets```', ephemeral: true, embeds: embeds });
		}
    else if(removeCh) {
			
		}	
	},
};