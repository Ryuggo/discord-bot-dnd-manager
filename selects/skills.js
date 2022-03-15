const { ButtonComponent } = require('@discordjs/builders');

const Database = require("@replit/database")
const db = new Database()

module.exports = {
    data: new ButtonComponent()
        .setCustomId('skills')
        .setLabel('skills'),
    async execute(interaction) {
			let options = interaction.message.components[0].components[0].options;
			let selects = interaction.values;
			
			let bd;
			const showCh = (options[0].value.split('+'))[0];
			
			if(showCh.length === 0)
				bd = await db.get(showCh)
			else
				bd = await db.get(interaction.member.user.id)
			
			for(let i of selects) {
				var j = (i.split('+'))[1];
				var obj = {};
				obj[options[j].label] = options[j].description ? options[j].description : 'tmp';
				bd.sheets[bd.charSelected][3].Skills[2].List.push(obj)
			}
					
			bd2 = await db.get(interaction.member.guild.id);
			const list = bd2["dm"];
			if(bd.sheets[bd.charSelected][3].Skills[2].List.length <= 5 || (bd.sheets[bd.charSelected][3].Skills[2].List.length <= 20 && list && interaction.member._roles.some(i => list.includes(i)))) {
				if(showCh.length === 0)
					db.set(showCh, bd);
				else
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