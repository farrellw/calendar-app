var DaysEvents = function() {
	this.events = [];
}

DaysEvents.prototype.addEvent = function(event) {
	this.events.push(event);
}

DaysEvents.prototype.numberOfEvents = function(){
	return this.events.length;
}

var eventOne = new DaysEvents();
eventOne.addEvent("Skating");

// Maps the key(date_string) with the value(daysEventObject)
var eventObjectLiteral = {

}

var seedCal = [
'1 1, 2017',
'1 6, 2017',
'1 24, 2017',
'1 26, 2017'
]

var seedEvents = [
	"Walk the dog",
	"Mow the lawn",
	"Cook Dinner",
	"Tech Interview Recap between HBK & Will",
	"Tell a Joke",
	"Experience with a new code framework"
]

eventObjectLiteral[seedCal[0]] = new DaysEvents();
eventObjectLiteral[seedCal[0]].addEvent(seedEvents[0]);
eventObjectLiteral[seedCal[0]].addEvent(seedEvents[1]);
eventObjectLiteral[seedCal[1]] = new DaysEvents();
eventObjectLiteral[seedCal[1]].addEvent(seedEvents[2]);
eventObjectLiteral[seedCal[1]].addEvent(seedEvents[5]);
eventObjectLiteral[seedCal[2]] = new DaysEvents();
eventObjectLiteral[seedCal[2]].addEvent(seedEvents[3]);
eventObjectLiteral[seedCal[2]].addEvent(seedEvents[4]);
eventObjectLiteral[seedCal[3]] = new DaysEvents();
console.log(eventObjectLiteral);
