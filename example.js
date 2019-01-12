const Nightmare = require('nightmare');
let nightmare = Nightmare({ show: false });
let wikipedia_scraping = require('./wikipediaScraping');

let url_string = 'https://en.wikipedia.org/wiki/List_of_UFC_events';
let base_url = 'https://en.wikipedia.org';

let fightResults = {}; 


let fightDetailsPromise = wikipedia_scraping.getFightDetails().then(function(value) {

  let a = wikipedia_scraping.visitFightPages(0, value).then(function(value) {
    console.log("\n\nhere we are");
    console.log(value);
    return value;
  });
});
/*
async function getExample() {
    var resultA = await wikipedia_scraping.getFightDetails();

    console.log(resultA);
    console.log('here1');


    var resultB = await wikipedia_scraping.visitFightPages(0, resultA);
    console.log(resultB);
    console.log('here2');

    return resultA;// something using both resultA and resultB
}
getExample();*/