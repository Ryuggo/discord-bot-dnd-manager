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
		.addStringOption(option => option.setName('set').setDescription('Create/ Edit a Character [(NB=0+)Name=value+Sex=value+...]'))
		.addBooleanOption(option => option.setName('remove').setDescription('Remove one of your Characters'))
		,
	async execute(interaction) {
		const showCh = interaction.options.getUser('show');
		const setCh = interaction.options.getString('set');
		const removeCh = interaction.options.getBoolean('remove');

		const row = new MessageActionRow();
		if (showCh) {
			const bd = await db.get(showCh.id);
			let embeds = [];
			if (bd) {
				let i = 0;
				bd["sheets"].forEach(sheets => {
					if(bd["charSelected"] == i) {
						if(showCh == interaction.user.id)
							embeds = sheet.Display(sheets, null, null);
						else
							embeds = sheet.Display(sheets, null, "Character");
					}
					i++;
				});
			}
			await interaction.reply({ content: '<@'+ showCh +'>  Actual Character\'s Sheet', ephemeral: true, embeds: embeds });
		}
    else if(setCh) {
			db.get(interaction.member.user.id).then(async chars => {
				if(!chars) {
					chars = { "charSelected": 0, "sheets": [] };
				}
				
				if(chars["sheets"].length < 5) {
					const bd = await db.get(interaction.member.guild.id);
					
					const tmp = setCh.replace(/(\n)+/g, '').split('+');
					let map = new Map();
					tmp.forEach(t => {
						const tmp2 = t.split('=');
						map.set(tmp2[0], tmp2[1]);
					})
					
					if(map.get("NB")) {
						sheets = sheet.Update(chars["sheets"][parseInt(map.get("NB"))], map);
					}
					else {
						sheets = sheet.Update(bd["sheet"], map);
						chars["sheets"].push(sheets)
					}
					
					db.set(interaction.member.user.id, chars);
					
					const embeds = sheet.Display(sheets, null, null);
					await interaction.reply({ content: '```Markdown\n# Character\'s Sheet```', ephemeral: true, embeds: embeds });
				}
				else {
					await interaction.reply({ content: 'No more place for more Character \nTry removing another one before', ephemeral: true });
				}
			})
		}
    else {
			const bd = await db.get(interaction.member.user.id);
			let embeds = [];
			const row = new MessageActionRow();
			const btn = 'character-';
			if (bd) {
				let i = 0;
				bd["sheets"].forEach(sheets => {
					const embed = sheet.Display(sheets, null, "Character");
					embeds.push(embed[0])

					if(removeCh) {
						row.addComponents(CreateButton.ButtonDanger( i.toString(), 'characterRemove-', embed[0].fields[0].value));
					}
					else {
						if(bd["charSelected"] == i)
							row.addComponents(CreateButton.ButtonSuccess( i.toString(), btn, embed[0].fields[0].value));
						else
							row.addComponents(CreateButton.ButtonPrimary( i.toString(), btn, embed[0].fields[0].value));
					}
					
					i++;
				});
				await interaction.reply({ content: '```Markdown\n# Character\'s Sheets```', ephemeral: true, embeds: embeds, components: [row] });
			} else
				await interaction.reply({ content: 'You don\'t have any Character', ephemeral: true });
    }
	},
};