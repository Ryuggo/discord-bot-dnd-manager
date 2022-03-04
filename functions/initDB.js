const Database = require("@replit/database")
const db = new Database()

const sheetTemplate = require("../datas/sheet.js")
const enemiesList = require("../datas/enemies.js")

module.exports = {
	InitDB: async (guildId) => {
		// Init DB if Empty
		db.get(guildId).then(bd => {
		  if (!bd)
				bd = { "defaultDice": 100, "dm": [], "sheet": sheetTemplate.getSheet(), "enemies": enemiesList.getEnemies() }
		  db.set(guildId, bd);
		})
	}
}