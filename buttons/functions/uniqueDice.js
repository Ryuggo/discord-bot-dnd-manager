module.exports = {
	WriteEmbed: (interaction) => {
	  const description = interaction.message.embeds[0].description;
	  const rdm = Math.floor(Math.random() * parseInt(interaction.customId) + 1);
	  
	  let txt = '';
	  if(description !== 'Select a dice to roll!') {
	    const lines = description.split('\n');
	    
	    let user = []; let allDices = [];
	    lines.forEach(l => {
	      const tmp = l.split(' => ');
	      user.push(tmp[0]);
	      allDices.push(tmp[1]);
	    })
	
	    if(!user.includes('<@'+interaction.member.user.id+'>'))
	      user.push('<@'+interaction.member.user.id+'>');
	
	    let list = new Map();
	    for(let i = 0; i < user.length; i++) {
	      let dices = [];
	      if(allDices[i])
	        dices = allDices[i].split(' - ');
	      if(user[i] === '<@'+interaction.member.user.id+'>')
	        dices.unshift(rdm.toString());
	      list.set(user[i], dices);
	    }
	
	    for(let [key, value] of list) {
				let txtDices = '';
	      if(key === '<@'+interaction.member.user.id+'>')
	      	txtDices = '**'+ value[0].replace(/(\*)+/g, '') +' ('+ (interaction.customId.toString()).replace('u', '') +')**';
				else
	      	txtDices = '**'+ value[0].replace(/(\*)+/g, '') +'**';
				
	      let i = 1
	      for(; i < 15 && i < value.length; i++) {
	        txtDices += ' - ' + value[i].replace(/(\*)+/g, '');
	      }
	      if(i == 15)
	        txtDices += ' - ..'
	      txt += key + ' => ' + txtDices + '\n';
	    }
	  }
	  else {
	    txt = '<@'+ interaction.member.user.id +'> => **'+ rdm +' ('+ (interaction.customId.toString()).replace('u', '') +')**';
	  }
	  return txt;
	}
}