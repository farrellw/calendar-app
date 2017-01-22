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

function addEvent() {
	var inputBox = $(this).parent().find('input')
	var inputText = inputBox.val();
	inputBox.val('');
	if (inputText) {
		var listOfEvents = $(this).closest('.calendar-cell').find('ul');
		listOfEvents.append("<li>" + inputText + "</>");
		var weekHolder = $(this).closest('.week-display');
		var fullDate = weekHolder.data('monthval') + " " + $(this).closest('.calendar-cell').data('date') + ", " + weekHolder.data('yearval');
		var eventObject = eventObjectLiteral[fullDate];
		if (!eventObject) {
			eventObjectLiteral[fullDate] = new DaysEvents();
			var eventObject = eventObjectLiteral[fullDate];
		}
		eventObject.addEvent(inputText);
	}
}