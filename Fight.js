class Fight {
	constructor(fightData, event, date) {
		this.division = fightData[0].replace("'","");
		if (fightData.length == 10) {
			this.outcome = fightData[4] + fightData[5] + fightData[6];
		} else {
			this.outcome = fightData[4];
		}
		this.fighter1 = fightData[1];
		this.fighter2 = fightData[3];
		if (fightData[2] == "def.") {
			this.winner = fightData[1];
		} else {
			this.winner = "Draw";
		}
		this.event = event;
		this.date = date;
	}
}

module.exports = Fight;