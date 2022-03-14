const { MessageActionRow, MessageEmbed } = require('discord.js');
const CreateSelect = require("../functions/messageSelect.js")
const skills = require("../datas/skills.js")

module.exports = {
	ToSelect (k, showCh) {
		let j = 0;
		var selects = CreateSelect.AddOption(new MessageActionRow(), 'skills-'+k, 'Select up to 5 skills', 1, 5);

		var skillList = skills.getSkills();
		let i = 0;
		for(let skill of skillList) {
			if(j == k)
				selects = CreateSelect.AddSelect(selects, skill['Name'], skill['Description'], showCh+'+'+i);
			
			i++;
			if(i >= 25) {
				i = 0; j++;
			}
		}

		return selects;
	}
}