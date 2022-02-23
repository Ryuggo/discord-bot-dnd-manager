const delay = ms => new Promise(res => setTimeout(res, ms));

// Time intervals less than 1 min is considered api spam and is against Discord TOS

module.exports = {
	RoleColor: async (role) => {
		/*
		var colors = ['#8585ff','#fff681','#a073fd','#fd73b9'];
		for(let i = 0; i <= colors.length; i++) {
			await delay(1000);
			role.edit({
					color: colors[i]
			})
			if (i >= colors.length) i = 0;
		}
		*/

		let i = 1;
		let j = 2;
		let k = 4;
		
		let rgb = [204, 52, 0];
		let txt = '#cc3300'
		while(true) {
			//console.log(role.color + ' - ' + txt + ' - ' + rgb);
			await delay(200);
			role.edit({
					color: rgbToHex(rgb[0], rgb[1], rgb[2])
			})

			if(rgb[i] == 204 || rgb[i] == 0) {
				i = i <= 0? 2 : i - 1;
				j = j <= 0? 2 : j - 1;
				k *= -1;
			}
			rgb[i] += k;
			
			txt = '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2])
		}
	}
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}