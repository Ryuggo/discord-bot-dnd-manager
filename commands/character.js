const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu } = require('discord.js');

const sheet = require("../functions/sheet.js")
const display = require("../buttons/functions/displaySheets.js")
const skills = require("../functions/skills.js")

const Database = require("@replit/database")
const db = new Database()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Create and Manage Characters for the tabletop RPG')
		.addUserOption(option => option.setName('show').setDescription('Show someone\'s Characters'))
		.addStringOption(option => option.setName('category').setDescription('Select the category of the sheet you want to see (DM only)'))
		.addStringOption(option => option.setName('set').setDescription('Create/ Edit a Character [(NB=0+)Name=value+Sex=value+...]'))
		.addBooleanOption(option => option.setName('skill').setDescription('Select Skills for your current character (0, 1)'))
		.addBooleanOption(option => option.setName('remove').setDescription('Remove one of your Characters'))
		,
	async execute(interaction) {
		const showCh = interaction.options.getUser('show');
		const categoryCh = interaction.options.getString('category');
		const setCh = interaction.options.getString('set');
		const skillCh = interaction.options.getBoolean('skill');
		const removeCh = interaction.options.getBoolean('remove');

		const row = new MessageActionRow();
    if(setCh) { // Create a char
			let bd;
			if(showCh)
				bd = await db.get(showCh.id)
			else
				bd = await db.get(interaction.member.user.id)
			
			if(!bd) {
				bd = { "charSelected": 0, "sheets": [] };
			}
			
			if(bd["sheets"].length < 5) {
				const tmp = setCh.replace(/(\n)+/g, '').split('+');
				let map = new Map();
				tmp.forEach(t => {
					const tmp2 = t.split('=');
					map.set(tmp2[0], tmp2[1]);
				})

				let sheets;
				if(map.get("NB") && parseInt(map.get("NB")) < bd["sheets"].length) {
					sheets = sheet.Update(bd["sheets"][parseInt(map.get("NB"))], map);
				}
				else {
					const bdBlank = await db.get(interaction.guild.id)
					sheets = sheet.Update(bdBlank["sheet"], map);
					bd["sheets"].push(sheets)
				}

				// Check if stats aren't higher than the total
				if(sheets[1]["Stats"][2]["Physical"][1]["GOOD"] != 'OK') {
					sheets[1]["Stats"][1]["GOOD"] = sheets[1]["Stats"][2]["Physical"][1]["GOOD"];
				}
				if(sheets[1]["Stats"][3]["Fight"][1]["GOOD"] != 'OK') {
					sheets[1]["Stats"][1]["GOOD"] = sheets[1]["Stats"][3]["Fight"][1]["GOOD"];
				}
				if(sheets[1]["Stats"][4]["Magic"][1]["GOOD"] != 'OK') {
					sheets[1]["Stats"][1]["GOOD"] = sheets[1]["Stats"][4]["Magic"][1]["GOOD"];
				}
				
	      bd2 = await db.get(interaction.member.guild.id);
	      const list = bd2["dm"];
				if(sheets[1]["Stats"][1]["GOOD"] == 'OK' || (list && interaction.member._roles.some(i => list.includes(i)))) {
					if(showCh)
						db.set(showCh.id, bd);
					else
						db.set(interaction.member.user.id, bd);
					
					const embeds = sheet.Display(sheets, null, null);
					await interaction.reply({ content: '```Markdown\n# Character\'s Sheet```', ephemeral: true, embeds: embeds });
					await interaction.followUp(interaction.member.user.username + ' : Character created');
				}
				else {
					if(sheets[1]["Stats"][1]["GOOD"] == 'HIGH')
						await interaction.reply({ content: '```Stats are higher than the total allowed```', ephemeral: true });
					else if (sheets[1]["Stats"][1]["GOOD"] == 'LOW')
						await interaction.reply({ content: '```One Stat is Lower than 5```', ephemeral: true });
				}
			}
			else {
				await interaction.reply({ content: 'No more place for more Character \nTry removing another one before', ephemeral: true });
			}
		}
		else if (showCh) { // Display someone's char
			const bd = await db.get(showCh.id);
			let embeds = [];
			if (bd && bd["sheets"].length > 0) {
				let category = null;
				if(categoryCh)
					category = categoryCh == 'null' ? null : categoryCh;
				
				let i = 0;
				bd["sheets"].forEach(sheets => {
					if(bd["charSelected"] == i) {
						if(showCh.id == interaction.user.id || (interaction.user.id == interaction.member.guild.ownerId && !categoryCh))
							embeds = sheet.Display(sheets, null, null);
						else
							embeds = sheet.Display(sheets, null, category);
					}
					i++;
				});
				await interaction.reply({ content: '<@'+ showCh +'>  Actual Character\'s Sheet', ephemeral: true, embeds: embeds });
			}
			else {
			await interaction.reply({ content: '<@'+ showCh +'> doesn\'t have any Character', ephemeral: true });
			}
		}
		else if(skillCh) { // Select Skills for your current char
			let bd = await db.get(interaction.member.user.id)
			
			if(!bd) {
				await interaction.reply({ content: 'You don\'t have any Character', ephemeral: true });
			}
			else {
				var selects = skills.ToSelect(0);
				await interaction.reply({ content: 'Select up to 5 skills in total for your current Character\n*(5 with this box + this other one, not 5 for each of them)*', components: [selects], ephemeral: true });
				
				selects = skills.ToSelect(1);
				await interaction.followUp({ content: 'Select up to 5 skills in total for your current Character\n*(5 with this box + this other one, not 5 for each of them)*', components: [selects], ephemeral: true });
			}
		}
    else { // Display your own chars
			const bd = await db.get(interaction.member.user.id);
			if (bd && bd["sheets"].length > 0) {
				const array = display.Display(bd, removeCh);
				
				await interaction.reply(array);
			} else
				await interaction.reply({ content: 'You don\'t have any Character', ephemeral: true });
    }
	},
};