var DaysEvents = function() {
	this.events = [];
}

DaysEvents.prototype.addEvent = function(event) {
	this.events.push(event);
}

DaysEvents.prototype.numberOfEvents = function(){
	return this.events.length;
}

// Maps the key(date_string) with the value(daysEventObject)
var eventObjectLiteral = {

}


