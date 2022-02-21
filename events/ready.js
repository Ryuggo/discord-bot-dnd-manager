const fs = require('fs');
const slow = require("../functions/slowLoop.js")

const DB = require("../functions/initDB.js")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {		
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
    const Guilds = client.guilds.cache.map(guild => guild.id);
		Guilds.forEach(g => {
			DB.InitDB(g);
		})

		/*
		// Rainbow Role
    const guild = client.guilds.cache.get("440820556120588289");
    const role = guild.roles.cache.find(roleVal => roleVal.name === "==== Bot ====");
		slow.RoleColor(role);
		*/
	},
};