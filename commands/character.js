const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const CreateButton = require("../functions/messageButton.js")
const sheet = require("../functions/sheet.js")
const display = require("../buttons/functions/displaySheets.js")

const Database = require("@replit/database")
const db = new Database()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Create and Manage Characters for the tabletop RPG')
		.addUserOption(option => option.setName('show').setDescription('Show someone\'s Characters'))
		.addStringOption(option => option.setName('select').setDescription('Select the part of the sheet you want to see (DM only)'))
		.addStringOption(option => option.setName('set').setDescription('Create/ Edit a Character [(NB=0+)Name=value+Sex=value+...]'))
		.addBooleanOption(option => option.setName('remove').setDescription('Remove one of your Characters'))
		,
	async execute(interaction) {
		const showCh = interaction.options.getUser('show');
		const selectCh = interaction.options.getString('select');
		const setCh = interaction.options.getString('set');
		const removeCh = interaction.options.getBoolean('remove');

		const row = new MessageActionRow();
    if(setCh) {
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
				if(typeof sheets[1]["Stats"][2]["Physical"][0]["GOOD"] !== 'undefined') {
					sheets[1]["Stats"][1]["GOOD"] = 'NO';
					sheets[1]["Stats"][2]["Physical"].splice(0,1);
				}
				if(typeof sheets[1]["Stats"][3]["Fight"][0]["GOOD"] !== 'undefined') {
					sheets[1]["Stats"][1]["GOOD"] = 'NO';
					sheets[1]["Stats"][3]["Fight"].splice(0,1);
				}
				if(typeof sheets[1]["Stats"][4]["Magic"][0]["GOOD"] !== 'undefined') {
					sheets[1]["Stats"][1]["GOOD"] = 'NO';
					sheets[1]["Stats"][4]["Magic"].splice(0,1);
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
				}
				else
					await interaction.reply({ content: '```Stats are higher than the total allowed```', ephemeral: true });
			}
			else {
				await interaction.reply({ content: 'No more place for more Character \nTry removing another one before', ephemeral: true });
			}
		}
		else if (showCh) {
			const bd = await db.get(showCh.id);
			let embeds = [];
			if (bd && bd["sheets"].length > 0) {
				let category = null;
				if(selectCh)
					category = selectCh == 'null'?null : selectCh;
				
				let i = 0;
				bd["sheets"].forEach(sheets => {
					if(bd["charSelected"] == i) {
						if(showCh.id == interaction.user.id || (interaction.user.id == interaction.member.guild.ownerId && !selectCh))
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
    else {
			const bd = await db.get(interaction.member.user.id);
			if (bd && bd["sheets"].length > 0) {
				const array = display.Display(bd, removeCh);
				
				await interaction.reply(array);
			} else
				await interaction.reply({ content: 'You don\'t have any Character', ephemeral: true });
    }
	},
};