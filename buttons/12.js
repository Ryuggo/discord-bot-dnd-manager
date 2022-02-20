const { ButtonComponent } = require('@discordjs/builders');

module.exports = {
    data: new ButtonComponent()
        .setCustomId('12')
        .setLabel('12'),
    async execute(interaction) {
        await interaction.reply({ content: ''+ Math.floor(Math.random() * parseInt(interaction.customId) + 1), ephemeral: false });
    },
};