const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	CreateSelect: (id, txt, min, max) => {
		return new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId(id)
					.setPlaceholder(txt)
					.setMinValues(min)
					.setMaxValues(max)
			);
	},
	
	AddSelect: (msg, lab, desc, val) => {
		 msg.components[0]
			.addOptions([
				{
					label: lab,
					description: desc,
					value: val,
				},
			]);
		return msg
	},
}