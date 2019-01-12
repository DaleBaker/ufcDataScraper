let wikipedia_scraping = require('./wikipediaScraping');
const pool = require('./postgres').pool;

let fightDetailsPromise = wikipedia_scraping.getFightDetails().then(function(value) {

    console.log("Links to UFC events obtained.");
    console.log(value);

    let a = wikipedia_scraping.visitFightPages(0, value).then(function(value) {

        console.log("All fight data collected");
        console.log(pool);
        /*
        const client = await pool.connect();


        const createTable = 'CREATE TABLE fights (ID BIGSERIAL PRIMARY KEY, fighter1 varchar(30),' + 
            'fighter2 varchar(30), event varchar(30), outcome varchar(30), winner varchar(30), date varchar(30))';
        client.query(createTable);



        client.release();*/
  });
});
