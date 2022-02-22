const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const CreateButton = require("../functions/messageButton.js")
const sheet = require("../functions/sheet.js")

const Database = require("@replit/database")
const db = new Database()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Create and Manage Characters for the tabletop RPG')
		.addUserOption(option => option.setName('show').setDescription('Show someone\'s Characters'))
		.addBooleanOption(option => option.setName('select').setDescription('Select a character to use its stats'))
		.addStringOption(option => option.setName('create').setDescription('Create a Character (Name=value+Sex=value+...)'))
		.addStringOption(option => option.setName('edit').setDescription('Edit one of your Character (NB=0+Name=value+Sex=value+...)'))
		.addBooleanOption(option => option.setName('remove').setDescription('Remove one of your Characters'))
		,
	async execute(interaction) {
		const showCh = interaction.options.getUser('show');
		const selectCh = interaction.options.getBoolean('select');
		const createCh = interaction.options.getString('create');
		const editCh = interaction.options.getString('edit');
		const removeCh = interaction.options.getBoolean('remove');

		const row = new MessageActionRow();
		if (showCh) {
			const bd = await db.get(showCh.id);
			let embeds = [];
			if (bd) {
				bd["sheets"].forEach(sheets => {
					embeds = sheet.Display(sheets, null, "Character");
				});
			}
			await interaction.reply({ content: '```Markdown\n# Character\'s Sheets```', ephemeral: true, embeds: embeds });
		}
    else if(selectCh) {
			const bd = await db.get(interaction.member.user.id);
			let embeds = [];
			const row = new MessageActionRow();
			if (bd) {
				let i = 0;
				bd["sheets"].forEach(sheets => {
					const embed = sheet.Display(sheets, null, "Character");
					embeds.push(embed[0])

					if(bd["charSelected"] == i) {
						row.addComponents(CreateButton.ButtonSuccess(i.toString(), 'character-', embed[0].fields[0].value));
					}
					else {
						row.addComponents(CreateButton.ButtonPrimary(i.toString(), 'character-', embed[0].fields[0].value));
					}
					
					i++;
				});
				await interaction.reply({ content: '```Markdown\n# Character\'s Sheets```', ephemeral: true, embeds: embeds, components: [row] });
			} else
				await interaction.reply({ content: 'You don\'t have any Character', ephemeral: true });
    }
    else if(createCh) {
			db.get(interaction.member.user.id).then(async chars => {
				if(!chars) {
					chars = { "charSelected": 0, "sheets": [] };
				}
				
				if(chars["sheets"].length < 5) {
					const bd = await db.get(interaction.member.guild.id);
					
					const tmp = createCh.replace(/(\n)+/g, '').split('+');
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
				}
				else {
					await interaction.reply({ content: 'No more place for more Character \nTry removing another one before', ephemeral: true });
				}
			})
		}
    else if(editCh) {
			db.get(interaction.member.user.id).then(async chars => {
				if(chars) {
					const tmp = editCh.replace(/(\n)+/g, '').split('+');
					let map = new Map();
					tmp.forEach(t => {
						const tmp2 = t.split('=');
						map.set(tmp2[0], tmp2[1]);
					})
					sheets = sheet.Update(chars["sheets"][parseInt(map.get("NB"))], map);
					
					chars["sheets"][parseInt(map.get("NB"))] = sheets
					
					db.set(interaction.member.user.id, chars);
					
					const embeds = sheet.Display(sheets, null, null);
					await interaction.reply({ content: '```Markdown\n# Character\'s Sheet```', ephemeral: true, embeds: embeds });
				}
				else {
					await interaction.reply({ content: 'No Character to Edit \nTry Creating a new one before', ephemeral: true });
				}
			})
		}
    else if(removeCh) {
			const bd = await db.get(interaction.member.user.id);
			let embeds = [];
			const row = new MessageActionRow();
			if(bd) {
				let i = 0;
				bd["sheets"].forEach(sheets => {
					const embed = sheet.Display(sheets, null, "Character");
					embeds.push(embed[0])
					
					row.addComponents(CreateButton.ButtonDanger(i.toString(), 'characterRemove-', embed[0].fields[0].value));
					i++;
				});
				await interaction.reply({ content: '```Markdown\n# Character\'s Sheets```', ephemeral: true, embeds: embeds, components: [row] });
			}
			else {
				await interaction.reply({ content: 'You don\'t have any Character', ephemeral: true });
			}
		}	
	},
};