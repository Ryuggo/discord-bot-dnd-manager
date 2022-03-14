const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	AddOption: (msg, id, txt, min, max) => {
		return msg.addComponents(
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