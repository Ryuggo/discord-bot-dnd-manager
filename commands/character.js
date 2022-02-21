const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

const Database = require("@replit/database")
const db = new Database()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Create and Manage Characters for the tabletop RPG')
		.addUserOption(option => option.setName('show').setDescription('Show someone\'s Characters'))
		.addIntegerOption(option => option.setName('select').setDescription('Select a character to use its stats'))
		.addStringOption(option => option.setName('create').setDescription('Create a Character'))
		.addStringOption(option => option.setName('edit').setDescription('Edit one of your Character'))
		.addStringOption(option => option.setName('list').setDescription('Show all of your Characters'))
		.addStringOption(option => option.setName('remove').setDescription('Remove one of your Characters'))
		,
	async execute(interaction) {
		const showCh = interaction.options.getUser('show');
		const selectCh = interaction.options.getInteger('select');
		const createCh = interaction.options.getString('create');
		const editCh = interaction.options.getString('edit');
		const listCh = interaction.options.getString('list');
		const removeCh = interaction.options.getString('remove');

		const row = new MessageActionRow();
		if (sets) {
			switch(sets) {
				case 1:
					row.addComponents(
						new MessageButton()
							.setCustomId('2')
							.setLabel('2')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('4')
							.setLabel('4')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('6')
							.setLabel('6')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('8')
							.setLabel('8')
							.setStyle('PRIMARY'),
						);
					break;
				case 2:
					row.addComponents(
						new MessageButton()
							.setCustomId('10')
							.setLabel('10')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('12')
							.setLabel('12')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('20')
							.setLabel('20')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('100')
							.setLabel('100')
							.setStyle('PRIMARY'),
						);
					break;
				default:
					row.addComponents(
						new MessageButton()
							.setCustomId('6')
							.setLabel('6')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('10')
							.setLabel('10')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('12')
							.setLabel('12')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('20')
							.setLabel('20')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('100')
							.setLabel('100')
							.setStyle('PRIMARY'),
						);
			}
			await interaction.reply({ content: 'Select a dice to roll!', ephemeral: true, components: [row] });
		}
    else if(unique) {
		row.addComponents(
			new MessageButton()
				.setCustomId('4u')
				.setLabel('4')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('6u')
				.setLabel('6')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('12u')
				.setLabel('12')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('20u')
				.setLabel('20')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('100u')
				.setLabel('100')
				.setStyle('SUCCESS'),
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
			const tmp = d.split('/');
			list.set(tmp[1], tmp[0]);
		})

		let txt = '';
		for(let [key, value] of list) {
			let tmp = [];
			for(let i = 0; i < value; i++) {
				tmp.push(Math.floor(Math.random() * key + 1).toString());
			}
			txt += '**'+ key +'** ['+ tmp +']\n';
		}

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