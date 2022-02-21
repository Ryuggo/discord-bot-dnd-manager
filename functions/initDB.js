const Database = require("@replit/database")
const db = new Database()

module.exports = {
	InitDB: async (guildId) => {
		const sheet = [
			{
				"Character": [
					{"Name": "", "Sex": "", "Age": ""},
					{"Origin": "", "Race": ""},
				],
			},
			{
				"Stats": [
					{
						"Physical": [
							{"TOTAL": 200},
							{"Agility": 0, "Strength": 0, "Perception": 0},
							{"Mental": 0},
						],
					},
					{
						"Fight": [
							{"TOTAL": 120},
							{"1 Hand/ Light": 0, "2 Hands/ Heavy": 0, "Shield/ Protection": 0},
							{"Bow/ Range": 0},
						],
					},
					{
						"Magic": [
							{"TOTAL": 100},
							{"Water": 0, "Earth": 0, "Air": 0},
							{"Lightning": 0, "Darkness": 0, "Light": 0},
							{"Fire": 0},
						],
					},
				],
			},
			{
				"Story": "",
			},
			{
				"Skills": [
					{"TOTAL": 5},
					{"List": []},
				],
			},
			{
				"Game": [
					{
						"Stats": [
							{"HP": 0, "Dmg": 0, "Armor": 0},
							{"MP": 0, "Coin": 0},
						],
					},
					{
						"Items": [],
					},
					{
						"Score": [
							{"Kill": 0, "Death": 0, "Fights": 0},
							{"Total Damage": 0, "Max Damage": 0},
						],
					},
				],
			},
		]

		// Init DB if Empty
		db.get(guildId).then(bd => {
		  if (!bd) {
				array = { "defaultDice": 100, "dm": [], "sheet": sheet }
		    db.set(guildId, array);
		  }
		})
	}
}