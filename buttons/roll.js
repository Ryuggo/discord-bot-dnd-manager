const { ButtonComponent } = require('@discordjs/builders');

module.exports = {
    data: new ButtonComponent()
        .setCustomId('roll')
        .setLabel('roll'),
    async execute(interaction, dice) {
      await interaction.reply({ content: '```Markdown\n# @'+interaction.member.nickname+'\n' + Math.floor(Math.random() * dice + 1) + ' (' + dice + ')```' });
    },
};