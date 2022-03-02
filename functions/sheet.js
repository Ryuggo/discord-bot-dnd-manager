const { MessageEmbed } = require('discord.js');
let total = 0;

module.exports = {
	Display (array, embed, name) {
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
	},
	
	Display2 (array, embed) {
		for(const bloc of array) {
			for(let key in bloc) {
				if(key != 'TOTAL' && key != 'COLOR' && key != 'GOOD' && key != 'imageURL' && bloc[key] != null) {
					if(bloc[key].length > 1 && typeof bloc[key] !== 'string' && typeof bloc[key] !== 'char') {
						embed.addField('__'+ key +'__', '-_-_-_-_-_-_-', false);
						embed = (this.Display2(bloc[key], embed));
					} else {
						if(typeof bloc[key] === 'number') {
							embed.addField(key, bloc[key] != -1?bloc[key].toString():'0', true);
						}
						else {
							embed.addField(key, bloc[key].length > 0?bloc[key]:'-', true);
						}
					}
				}
				else if(key == 'COLOR') {
					embed.setColor(bloc[key]);
				}
				else if(key == 'imageURL') {
					embed.setThumbnail(bloc[key]);
				}
			}
		}
		return embed;
	},

	
	Update (array, map) {
		for(const bloc of array) {
			for(let key in bloc) {
				if(key != 'Skills' && key != 'Game') {
					if(bloc[key].length > 1 && typeof bloc[key] !== 'string') {
						bloc[key] = this.Update2(bloc[key], map);
					} else {
						bloc[key] = map.get(key) ? map.get(key) : bloc[key];
					}
				}
			}
		}
		return array;
	},
	
	Update2 (array, map) {
		let actual = -1;
		for(let bloc of array) {
			for(let key in bloc) {
				if(key != 'TOTAL' && key != 'COLOR' && key != 'GOOD' && bloc[key] != null) {
					if(bloc[key].length > 1 && typeof bloc[key] !== 'string') {
						bloc[key] = this.Update2(bloc[key], map);
					} else {
						bloc[key] = map.get(key) ? map.get(key) : bloc[key];
						if(actual != -1) {
							actual += parseInt(bloc[key]);
							if(actual > total) {
								array.splice(0, 0, {"GOOD": "NO"});
								actual = -1;
							}
						}
					}
				}
				else if(key == 'TOTAL') {
					total = bloc[key];
					actual = 0;
				}
			}
		}
		return array;
	}
}