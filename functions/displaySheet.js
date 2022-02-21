const { MessageEmbed } = require('discord.js');

module.exports = {
	DetectArray (array, embed) {
		let embeds = [];
		array.forEach(bloc => {
			for(let key in bloc) {
				embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(key);

				embeds.push(embed);
				
				if(bloc[key].length > 1) {
					embed = (this.DetectArray2(bloc[key], embed));
				} else {
					embed.setDescription(bloc[key] && bloc[key].length > 0?bloc[key] : 'NaN');
				}
			}
		});
		return embeds;
	},
	
	DetectArray2 (array, embed) {
		array.forEach(bloc => {
			for(let key in bloc) {
				if(key != 'TOTAL') {
					if(bloc[key].length > 1) {
						embed.addField('__'+ key +'__', '-_-_-_-_-_-_-', false);
						embed = (this.DetectArray2(bloc[key], embed));
					} else {
							embed.addField(key, bloc[key] && bloc[key].length > 0?bloc[key] : 'NaN', true);
					}
				}
			}
		});
		return embed;
	}
}