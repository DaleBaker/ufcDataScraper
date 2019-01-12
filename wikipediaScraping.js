const Nightmare = require('nightmare');

let fightResults = {};
let url_string = 'https://en.wikipedia.org/wiki/List_of_UFC_events';
let base_url = 'https://en.wikipedia.org';
const NUMBER_OF_FIGHTS = 10;


function visitFightPages(i, list_of_UFC_events) {
	return new Promise(function(resolve, reject) {
		function iterationMethod(i, list_of_UFC_events) {

  	setTimeout(function () {
	    nightmare = Nightmare({ show: false })  
	    let full_url_string = base_url + list_of_UFC_events[i];
	    console.log(full_url_string);
	    nightmare
	      .goto(full_url_string)
	      .wait(400)
	      .evaluate(function() {
	        var rawResults = []
	        $(".toccolours tr").each(function() {
	          console.log($(this))
	          rawResults.push($(this).text().replace('Women\\\'s','Women\'s').replace('\n','').replace(/\n\n/g,',').replace('\n',''))
	        })
	        return rawResults
	      })
	      .end()
	      .then(function (result) {
	        let cardResults = [];
	        for (let i = 0; i < result.length ; i++) {
	          let parsed = result[i].split(',');
	          if (!(parsed.length === 1) && !(parsed[0] === "Weight class")) {
	            cardResults.push(parsed);
	          }
	        }
	        fightResults[list_of_UFC_events[i]] = cardResults;
	      })
	      .catch(error => {
	        console.error('Search failed:', error)
	      });

	    if (i < NUMBER_OF_FIGHTS) {
	      iterationMethod(i + 1, list_of_UFC_events);
	    } else {
	    	console.log('fight results are being resolved');
	    	resolve(fightResults);
	    }
	}, 900);
  }
  iterationMethod(i, list_of_UFC_events);
  });

}

function getFightDetails() {
	return new Promise(function(resolve, reject) {
		setTimeout(function () {
			nightmare = Nightmare({ show: false })  
			nightmare
				.goto(url_string)
				.wait(300)
				.evaluate(function() {
					var List_of_UFC_events = []
					$("#Past_events tr td:nth-child(2)").each(function() {
					  List_of_UFC_events.push($(this).children().attr("href"));
					})  
					return List_of_UFC_events
				})
				.end()
				.then(function (result) {
					resolve(result);
				})
				.catch(error => {
					console.error('Search failed:', error)
			});
		}, 2000);
  	});
}

module.exports = {
  visitFightPages: visitFightPages,
  getFightDetails: getFightDetails 
};
