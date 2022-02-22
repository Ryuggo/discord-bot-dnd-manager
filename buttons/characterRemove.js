const { ButtonComponent } = require('@discordjs/builders');

const Database = require("@replit/database")
const db = new Database()

module.exports = {
    data: new ButtonComponent()
        .setCustomId('characterRemove')
        .setLabel('characterRemove'),
    async execute(interaction, number) {
			const bd = await db.get(interaction.member.user.id);
			const nb = parseInt(number);
			
			let name = '';
			let i = 0;
			bd["sheets"].forEach(sheets => {
				if(i == nb) name = sheets[0].Character[0].Name;
				i++;
			});
			
			bd["sheets"].splice(nb, 1);
			
			db.set(interaction.member.user.id, bd);
			
      await interaction.reply({ content: 'Character Deleted : ' + name, ephemeral: true });
    },
};