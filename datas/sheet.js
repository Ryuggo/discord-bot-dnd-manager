module.exports = {
	getSheet () {
		return sheet = [
			{
				"Character": [
					{"COLOR": "#0586f0"},
					{"Name": -1, "Sex": -1, "Age": -1},
					{"Origin": -1, "Race": -1},
					{"imageURL": ""},
				],
			},
			{
				"Stats": [
					{"COLOR": "#05f028"},
					{"GOOD": "OK"},
					{
						"Physical": [
							{"TOTAL": 200},
							{"GOOD": "OK"},
							{"Agility": -1, "Strength": -1, "Perception": -1},
							{"Mental": -1},
						],
					},
					{
						"Fight": [
							{"TOTAL": 120},
							{"GOOD": "OK"},
							{"1 Hand/ Light": -1, "2 Hands/ Heavy": -1, "Shield/ Protection": -1},
							{"Bow/ Range": -1},
						],
					},
					{
						"Magic": [
							{"TOTAL": 100},
							{"GOOD": "OK"},
							{"Water": -1, "Earth": -1, "Air": -1},
							{"Lightning": -1, "Darkness": -1, "Light": -1},
							{"Fire": -1},
						],
					},
				],
			},
			{
				"Story": "",
			},
			{
				"Skills": [
					{"COLOR": "#e005f0"},
					{"TOTAL": 5},
					{"List": []},
				],
			},
			{
				"Game": [
					{"COLOR": "#f09605"},
					{
						"Stats": [
							{"HP": 20, "Dmg": 4, "Armor": -1},
							{"MP": -1, "Coin": -1},
						],
					},
					{
						"Items": [],
					},
					{
						"Score": [
							{"Kill": -1, "Death": -1, "Fights": -1},
							{"Total Damage": -1, "Max Damage": -1},
						],
					},
				],
			},
		];
	}
}