const { MessageButton } = require('discord.js');

module.exports = {
	ButtonPrimary: (number, command) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(number)
			.setStyle('PRIMARY');
	},
	
	ButtonSecondary: (number, command) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(number)
			.setStyle('SECONDARY');
	},
	
	ButtonSuccess: (number, command) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(number)
			.setStyle('SUCCESS');
	},
	
	ButtonDanger: (number, command) => {
		return new MessageButton()
			.setCustomId(command + number)
			.setLabel(number)
			.setStyle('DANGER');
	}
}