const { ButtonComponent } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Dice = require("./functions/uniqueDice.js")

module.exports = {
    data: new ButtonComponent()
        .setCustomId('rollu')
        .setLabel('rollu'),
    async execute(interaction, dice) {
      const txt = Dice.WriteEmbed(interaction, dice);
      
      const embed = new MessageEmbed()
  			.setColor('#0099ff')
  			.setTitle('Dice Rolls')
  			.setDescription(txt);
      
			await interaction.update({ content: null, embeds: [embed] });
    },
};