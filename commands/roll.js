const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const CreateButton = require("../functions/messageButton.js")

const Database = require("@replit/database")
const db = new Database()

db.get("defaultDice").then(def => {
  if (!def) {
    db.set("defaultDice", 100);
  }
})


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll dices (*dices* and *sets* options can\'t be selected at the same time')
		.addStringOption(option => option.setName('dices').setDescription('How many faces every dices have ([qty/faces]+[qty/faces]+..)'))
		.addIntegerOption(option => option.setName('sets').setDescription('Show a premade set (int)'))
		.addBooleanOption(option => option.setName('unique').setDescription('One set of dices that doesn\'t send new messages (bool)'))
		.addBooleanOption(option => option.setName('hidden').setDescription('Only you can see the result (bool)'))
		,
	async execute(interaction) {
		const dices = interaction.options.getString('dices');
		const sets = interaction.options.getInteger('sets');
		const unique = interaction.options.getBoolean('unique');
		const hidden = interaction.options.getBoolean('hidden');
		const setDefault = interaction.options.getInteger('default');

		const row = new MessageActionRow();
		if (sets) {
			switch(sets) {
				case 1:
					row.addComponents(
						CreateButton.ButtonPrimary('2'),
						CreateButton.ButtonPrimary('4'),
						CreateButton.ButtonPrimary('6'),
						CreateButton.ButtonPrimary('8'),
						);
					break;
				case 2:
					row.addComponents(
						CreateButton.ButtonPrimary('10'),
						CreateButton.ButtonPrimary('12'),
						CreateButton.ButtonPrimary('20'),
						CreateButton.ButtonPrimary('100'),
						);
					break;
				default:
					row.addComponents(
						CreateButton.ButtonPrimary('6'),
						CreateButton.ButtonPrimary('10'),
						CreateButton.ButtonPrimary('12'),
						CreateButton.ButtonPrimary('20'),
						CreateButton.ButtonPrimary('100'),
						);
			}
			await interaction.reply({ content: 'Select a dice to roll!', ephemeral: true, components: [row] });
		}
    else if(unique) {
      row.addComponents(
				CreateButton.ButtonSuccess('4'),
				CreateButton.ButtonSuccess('6'),
				CreateButton.ButtonSuccess('12'),
				CreateButton.ButtonSuccess('20'),
				CreateButton.ButtonSuccess('100'),
        );

      const embed = new MessageEmbed()
  			.setColor('#0099ff')
  			.setTitle('Dice Rolls')
  			.setDescription('Select a dice to roll!');
      
			await interaction.reply({ embeds: [embed], components: [row] });
    }
    else if(dices) {
      const allDices = dices.replace(/\s+/g, '').split('+');

      let list = new Map();
      allDices.forEach(d => {
        const tmp = d.split('d');
        list.set(tmp[1], tmp[0]);
      })

      let txt = '```Markdown\n';
      for(let [key, value] of list) {
        let tmp = [];
        for(let i = 0; i < value; i++) {
          tmp.push(Math.floor(Math.random() * key + 1));
        }
        txt += '# '+ tmp.reduce((partialSum, a) => partialSum + a, 0) +'\n';
				txt += 'Details:['+ value +"d"+ key +' ('+ tmp.join(" ") +')]\n';
      }
			txt += '```';
      
			await interaction.reply({ content: txt, ephemeral: hidden });
		}
    else {
      const dice = await db.get("defaultDice");
      const list = await db.get("dm");
			if(interaction.member._roles.some(i => list.includes(i)) && hidden === null) {
				await interaction.reply({ content: ''+ Math.floor(Math.random() * dice + 1), ephemeral: true });
			} else
				await interaction.reply({ content: ''+ Math.floor(Math.random() * dice + 1), ephemeral: hidden });
		}
	},
};