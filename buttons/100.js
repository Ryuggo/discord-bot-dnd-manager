const { ButtonComponent } = require('@discordjs/builders');

module.exports = {
    data: new ButtonComponent()
        .setCustomId('100')
        .setLabel('100'),
    async execute(interaction) {
        await interaction.reply({ content: ''+ Math.floor(Math.random() * parseInt(interaction.customId) + 1), ephemeral: false });
    },
};