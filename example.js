let wikipedia_scraping = require('./wikipediaScraping');
const pool = require('./postgres').pool;

let fightDetailsPromise = wikipedia_scraping.getFightDetails().then(function(value) {

    console.log("Links to UFC events obtained.");

    let a = wikipedia_scraping.visitFightPages(0, value).then(function(value) {

        console.log(value);

        //const client = await pool.connect()

        //client.query(addLesMills);

        //const addStudio41Camera = 'CREATE TABLE UFCevents (ID BIGSERIAL PRIMARY KEY, name varchar(40),' + 
          //  'date varchar(30), accesscode varchar(30), contact varchar(30))';
        //client.query(addStudio41Camera);

        //client.release();
  });
});
