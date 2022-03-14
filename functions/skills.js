const { MessageEmbed } = require('discord.js');
const CreateSelect = require("../functions/messageSelect.js")
const skills = require("../datas/skills.js")

module.exports = {
	ToSelect () {
		var selects = CreateSelect.CreateSelect('skills', 'Select up to 5 skills', 1, 5);

		var skillList = skills.getSkills();
		console.log(skillList)
		/*
		for(let skill in skillList) {
			selects = CreateSelect.AddSelect(selects, 'label', 'descrition', 'value');
		}*/

		return selects;

		/*
		let embeds = [];
		for(const bloc of array) {
			for(let key in bloc) {
				if(name == null || name == key) {
					embed = new MessageEmbed()
					.setTitle(key);
	
					embeds.push(embed);
					
					if(bloc[key].length > 1 && typeof bloc[key] !== 'string') {
						embed = (this.Display2(bloc[key], embed));
					} else {
						embed.setDescription(bloc[key] && bloc[key].length > 0?bloc[key] : '=')
							.setColor("#05f0f0");
					}
				}
			}
		}
		return embeds;
		*/
	}
}