const { ButtonComponent } = require('@discordjs/builders');

const Database = require("@replit/database")
const db = new Database()

module.exports = {
    data: new ButtonComponent()
        .setCustomId('character')
        .setLabel('character'),
    async execute(interaction, number) {
			const bd = await db.get(interaction.member.user.id);
			const nb = parseInt(number);
			bd["charSelected"] = nb;

			let name = '';
			let i = 0;
			bd["sheets"].forEach(sheets => {
				if(i == nb) name = sheets[0].Character[0].Name;
				i++;
			});

			await db.set(interaction.member.user.id, bd);
			
      await interaction.reply({ content: 'You\'re now playing with : ' + name, ephemeral: true });
    },
};