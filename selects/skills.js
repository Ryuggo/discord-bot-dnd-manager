const { ButtonComponent } = require('@discordjs/builders');

const Database = require("@replit/database")
const db = new Database()

module.exports = {
    data: new ButtonComponent()
        .setCustomId('skills')
        .setLabel('skills'),
    async execute(interaction) {
			let bd = await db.get(interaction.member.user.id)
			
			let options = interaction.message.components[0].components[0].options;
			let selects = interaction.values;
			
			for(let i of selects) {
				var obj = {};
				obj[options[i].label] = options[i].description ? options[i].description : 'tmp';
				bd.sheets[bd.charSelected][3].Skills[2].List.push(obj)
			}
					
			if(bd.sheets[bd.charSelected][3].Skills[2].List.length <= 5) {
				db.set(interaction.member.user.id, bd);
				
				await interaction.reply({ content: 'Skills added yo your current Character', ephemeral: true });
			}
			else {
				bd.sheets[bd.charSelected][3].Skills[2].List = []
				
				db.set(interaction.member.user.id, bd);
				
				await interaction.reply({ content: 'You choose more than 5 skills\nResetting your skills list', ephemeral: true });
			}
    },
};