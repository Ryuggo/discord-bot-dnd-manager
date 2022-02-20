const { MessageButton } = require('discord.js');

module.exports = {
	ButtonPrimary: (number) => {
		return new MessageButton()
			.setCustomId(number)
			.setLabel(number)
			.setStyle('PRIMARY');
	},
	
	ButtonSecondary: (number) => {
		return new MessageButton()
			.setCustomId(number)
			.setLabel(number)
			.setStyle('SECONDARY');
	},
	
	ButtonSuccess: (number) => {
		return new MessageButton()
			.setCustomId(number + 'u')
			.setLabel(number)
			.setStyle('SUCCESS');
	},
	
	ButtonDanger: (number) => {
		return new MessageButton()
			.setCustomId(number)
			.setLabel(number)
			.setStyle('DANGER');
	}
}