const Nightmare = require('nightmare');
let nightmare = Nightmare({ show: false });
let wikipedia_scraping = require('./wikipediaScraping');

let url_string = 'https://en.wikipedia.org/wiki/List_of_UFC_events';
let base_url = 'https://en.wikipedia.org';

let fightResults = {}; 


let fightDetailsPromise = wikipedia_scraping.getFightDetails().then(function(value) {

    console.log("Links to UFC events obtained.");

    let a = wikipedia_scraping.visitFightPages(0, value).then(function(value) {

        return value;
  });
});
