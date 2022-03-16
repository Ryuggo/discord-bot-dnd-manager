const { ButtonComponent } = require('@discordjs/builders');

const display = require("./functions/displaySheets.js");

const Database = require("@replit/database")
const db = new Database()

module.exports = {
    data: new ButtonComponent()
        .setCustomId('characterRemove')
        .setLabel('characterRemove'),
    async execute(interaction, number) {
			const bd = await db.get(interaction.member.user.id);
			const nb = parseInt(number);

			if(bd["charSelected"] == nb) bd["charSelected"] = 0;
			
			bd["sheets"].splice(nb, 1);
			
			db.set(interaction.member.user.id, bd);
			
			if(bd["sheets"].length != 0) {
				const name = bd["sheets"][bd["charSelected"]][0].Character[1].Name
				if (interaction.member.user.id !== interaction.member.guild.ownerId)
					interaction.member.setNickname(name);
				
				const array = display.Display(bd, null)
				
      	await interaction.update(array);
			}
			else {
				//console.log(interaction.message)
				//interaction.message.suppressEmbeds(true)
				await interaction.update({ content: 'You don\'t have any Character', ephemeral: true });
			}
			
    },
};