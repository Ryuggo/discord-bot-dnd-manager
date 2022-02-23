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
			
			let name = '';
			let i = 0;
			bd["sheets"].forEach(sheets => {
				if(i == nb) name = sheets[0].Character[1].Name;
				i++;
			});

			if(bd["charSelected"] == nb) bd["charSelected"] = 0;
			
			bd["sheets"].splice(nb, 1);
			
			db.set(interaction.member.user.id, bd);

			const array = display.Display(bd, null)
			
      await interaction.update(array);
    },
};