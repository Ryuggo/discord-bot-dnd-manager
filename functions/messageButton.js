const { MessageButton } = require('discord.js');

module.exports = {
	ButtonPrimary: (number, command, label) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(label)
			.setStyle('PRIMARY');
	},
	
	ButtonSecondary: (number, command, label) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(label)
			.setStyle('SECONDARY');
	},
	
	ButtonSuccess: (number, command, label) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(label)
			.setStyle('SUCCESS');
	},
	
	ButtonDanger: (number, command, label) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(label)
			.setStyle('DANGER');
	}
}