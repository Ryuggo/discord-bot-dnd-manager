const { ButtonComponent } = require('@discordjs/builders');

const Database = require("@replit/database")
const db = new Database()

module.exports = {
    data: new ButtonComponent()
        .setCustomId('skills')
        .setLabel('skills'),
    async execute(options, numbers) {
			console.log(options)
			console.log(numbers)
			/*
			const bd = await db.get(interaction.member.user.id);
			const nb = parseInt(number);
			bd["charSelected"] = nb;

			let name = '';
			let i = 0;
			bd["sheets"].forEach(sheets => {
				if(i == nb) name = sheets[0].Character[1].Name;
				i++;
			});

			db.set(interaction.member.user.id, bd);
			if (interaction.member.user.id !== interaction.member.guild.ownerId)
				interaction.member.setNickname(name);

			const array = display.Display(bd, null)
			
      await interaction.update(array);
			*/
    },
};