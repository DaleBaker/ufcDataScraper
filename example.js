require('dotenv').load();

let wikipedia_scraping = require('./wikipediaScraping');
const pool = require('./postgres').pool;

let fightDetailsPromise = wikipedia_scraping.getFightDetails().then(function(value) {

    console.log("Links to UFC events obtained.");
    console.log(value);

    let a = wikipedia_scraping.visitFightPages(0, value).then(function(fightData) {
        console.log("All fight data collected");
        pool.connect().then(function(client) {
            let deleteTable = "DROP TABLE fights";
            client.query(deleteTable);

            const createTable = 'CREATE TABLE fights (ID BIGSERIAL PRIMARY KEY, division varchar(30), fighter1 varchar(40),' + 
                'fighter2 varchar(40), event varchar(40), outcome varchar(40), winner varchar(40), date varchar(30))';
            client.query(createTable);

            for (let event in fightData) {
                console.log(fightData[event]);
                for (let fight in fightData[event]["fightResults"]) {
                    let f = fightData[event]["fightResults"][fight];
                    const addFightQuery = 'INSERT INTO fights (division, fighter1, fighter2, event, outcome, winner, date)' +
                        ' VALUES(\'' + f.division + '\',\'' +  f.fighter1 + '\',\'' + f.fighter2 + '\',\'' +  
                        f.event + '\',\'' + f.outcome + '\',\'' + f.winner + '\',\'' + f.date  + '\')';
                    client.query(addFightQuery);
                }
            }
            client.release();
        }).catch(function(err) {
            console.log("failed to access database");
        });;
      }).catch(function(err) {
        console.log("failed to collect data from all the fights");
    });
}).catch(function(err) {
    console.log("failed to collect links to all fights");
});


        