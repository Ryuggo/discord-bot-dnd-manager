const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const CreateButton = require("../../functions/messageButton.js")
const sheet = require("../../functions/sheet.js")

const Database = require("@replit/database")
const db = new Database()

module.exports = {
	Display: (bd, removeCh) => {
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
}