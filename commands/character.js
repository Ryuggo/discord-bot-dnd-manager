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
			if (bd && bd["sheets"].length > 0) {
				let category = "Character";
				if(setCh)
					category = setCh == 'null'?null : setCh;
				
				let i = 0;
				bd["sheets"].forEach(sheets => {
					if(bd["charSelected"] == i) {
						if(showCh == interaction.user.id || (interaction.user.id == interaction.member.guild.ownerId && !setCh))
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
    else if(setCh) {
			const bd = await db.get(interaction.member.user.id)
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
				if(map.get("NB")) {
					sheets = sheet.Update(bd["sheets"][parseInt(map.get("NB"))], map);
				}
				else {
					const bdBlank = await db.get(interaction.guild.id)
					sheets = sheet.Update(bdBlank["sheet"], map);
					bd["sheets"].push(sheets)
				}
console.log(sheets[1]["Stats"]);
				if(sheets[1]["Stats"] != null) {
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


/*
function displaySheets(bd, removeCh) {
	let embeds = [];
	const row = new MessageActionRow();
	const btn = 'character-';
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

	return { content: '```Markdown\n# Character\'s Sheets```', ephemeral: true, embeds: embeds, components: [row] };
}
*/