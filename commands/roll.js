const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const CreateButton = require("../functions/messageButton.js")

const Database = require("@replit/database")
const db = new Database()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll dices (*dices* and *sets* options can\'t be selected at the same time')
		.addStringOption(option => option.setName('dices').setDescription('How many faces every dices have (1d8+[nb]d[faces]+..) max nb = 100 & max dices = 10'))
		.addIntegerOption(option => option.setName('sets').setDescription('Show a premade set (int)'))
		.addBooleanOption(option => option.setName('unique').setDescription('One set of dices that doesn\'t send new messages (bool)'))
		.addBooleanOption(option => option.setName('hidden').setDescription('Only you can see the result (bool)'))
		,
	async execute(interaction) {
		const dices = interaction.options.getString('dices');
		const sets = interaction.options.getInteger('sets');
		const unique = interaction.options.getBoolean('unique');
		let hidden = interaction.options.getBoolean('hidden');
		const setDefault = interaction.options.getInteger('default');

		const row = new MessageActionRow();
		if (sets) {
			switch(sets) {
				case 1:
					row.addComponents(
						CreateButton.ButtonPrimary('2', 'roll-'),
						CreateButton.ButtonPrimary('4', 'roll-'),
						CreateButton.ButtonPrimary('6', 'roll-'),
						CreateButton.ButtonPrimary('8', 'roll-'),
						);
					break;
				case 2:
					row.addComponents(
						CreateButton.ButtonPrimary('10', 'roll-'),
						CreateButton.ButtonPrimary('12', 'roll-'),
						CreateButton.ButtonPrimary('20', 'roll-'),
						CreateButton.ButtonPrimary('100', 'roll-'),
						);
					break;
				default:
					row.addComponents(
						CreateButton.ButtonPrimary('6', 'roll-'),
						CreateButton.ButtonPrimary('10', 'roll-'),
						CreateButton.ButtonPrimary('12', 'roll-'),
						CreateButton.ButtonPrimary('20', 'roll-'),
						CreateButton.ButtonPrimary('100', 'roll-'),
						);
			}
			await interaction.reply({ content: 'Select a dice to roll!', ephemeral: true, components: [row] });
		}
    else if(unique) {
      row.addComponents(
				CreateButton.ButtonSuccess('4', 'rollu-'),
				CreateButton.ButtonSuccess('6', 'rollu-'),
				CreateButton.ButtonSuccess('12', 'rollu-'),
				CreateButton.ButtonSuccess('20', 'rollu-'),
				CreateButton.ButtonSuccess('100', 'rollu-'),
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
        list.set(tmp[1] != null?tmp[1] : 1, tmp[0]);
      })

      let txt = '```Markdown\n';
			let j = 0;
      for(let [key, value] of list) {
        let tmp = [];
				let i = 0;
        for(; i < value && i < 100; i++) {
          tmp.push(Math.floor(Math.random() * key + 1));
        }
        txt += '# '+ tmp.reduce((partialSum, a) => partialSum + a, 0) +'\n';
				txt += 'Details:['+ i-- +"d"+ key +' ('+ tmp.join(" ") +')]\n';

				j++;
				if(j > 10) break;
      }
			txt += '```';
      
			await interaction.reply({ content: txt, ephemeral: hidden });
		}
    else {
      const bd = await db.get(interaction.member.guild.id);
      const dice = bd["defaultDice"];
      const list = bd["dm"];
			if(list) {
				if(interaction.member._roles.some(i => list.includes(i)) && hidden === null) {
					hidden = true;
				}
			}
			await interaction.reply({ content: ''+ Math.floor(Math.random() * dice + 1), ephemeral: hidden });
		}
	},
};