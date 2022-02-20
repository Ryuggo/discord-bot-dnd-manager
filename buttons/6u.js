const { ButtonComponent } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Dice = require("./functions/uniqueDice.js")

module.exports = {
    data: new ButtonComponent()
        .setCustomId('6')
        .setLabel('6u'),
    async execute(interaction) {
      const txt = Dice.WriteEmbed(interaction);
      
      const embed = new MessageEmbed()
  			.setColor('#0099ff')
  			.setTitle('Dice Rolls')
  			.setDescription(txt);
      
        await interaction.update({ content: null, embeds: [embed] });
    },
};