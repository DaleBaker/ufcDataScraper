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
	      .evaluate(function() {
	      	let eventData = {};
	        var rawResults = [];
			eventData["eventDate"] = "jere";
	        eventData["eventName"] = $("#firstHeading").text();
	        $(".toccolours tr").each(function() {
	        	let row = $(this).text().replace('\n','').replace(/\n\n/g,',').replace('\n','').split(",");
	        	if (!(row.length === 1) && !(row[0] === "Weight class")) {
	            	rawResults.push(row);
	          	}
	        });
	       	$(".infobox tr").each(function() {
	        	let row = $(this).text();
	        	if ((row.substring(0, 4) === "Date")) {
	            	eventData["eventDate"] = $(this).text().replace('Date','');
	          	}
	        });
	        eventData["fightResults"] = rawResults;

	        return eventData;
	      })
	      .end()
	      .then(function (result) {

	        fightResults[list_of_UFC_events[i]] = result;

		    if (i < NUMBER_OF_FIGHTS) {
		      iterationMethod(i + 1, list_of_UFC_events);
		    } else {
		    	console.log('fight results are being resolved');
		    	resolve(fightResults);
		    }
	      })
	      .catch(error => {
	        console.error('Search failed:', error)
	      });

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
