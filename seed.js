var seedCal = [
'12 20, 2016',
'1 1, 2017',
'1 6, 2017',
'1 24, 2017',
'1 26, 2017',
'2 10, 2017',
'2 20, 2017'
]

var seedEvents = [
	"Call Friend on Phone",
	"Walk the dog",
	"Go Golfing",
	"Mow the lawn",
	"Read a book",
	"Refactor Code",
	"Read another book",
	"Cook Dinner",
	"Organize Room",
	"Tech Interview Recap between HBK & Will",
	"Tell a Joke",
	"Experience with a new code framework",
	"Wash Dishes",
	"Listen to Music",
	"Play Basketball"
]

for (var i = 0; i < seedCal.length; i++) {
	eventObjectLiteral[seedCal[i]] = new DaysEvents();
}
for (var j = 0; j < 2; j++) {
	eventObjectLiteral[seedCal[0]].addEvent(seedEvents[j]);
}
for (var k = 2; k < 5; k++) {
	eventObjectLiteral[seedCal[1]].addEvent(seedEvents[k]);
}
for (var l = 5; l < 7; l++) {
	eventObjectLiteral[seedCal[2]].addEvent(seedEvents[l]);
}
for (var m = 7; m < 9; m++) {
	eventObjectLiteral[seedCal[3]].addEvent(seedEvents[m]);
}
for (var n = 9; n < 10; n++) {
	eventObjectLiteral[seedCal[4]].addEvent(seedEvents[n]);
}
for (var o = 10; o < 13; o++) {
	eventObjectLiteral[seedCal[5]].addEvent(seedEvents[o]);
}
for (var p = 13; p < 15; p++) {
	eventObjectLiteral[seedCal[6]].addEvent(seedEvents[p]);
}
console.log(eventObjectLiteral);