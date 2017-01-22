var DaysEvents = function() {
	this.events = [];
}

DaysEvents.prototype.addEvent = function(event) {
	this.events.push(event);
}

DaysEvents.prototype.numberOfEvents = function(){
	return this.events.length;
}

DaysEvents.prototype.deleteEvent = function(event) {
	var arrayOfEvents = this.events;
	var i = arrayOfEvents.indexOf(event);
	arrayOfEvents.splice(i, 1);
}

// Maps the key(date_string) with the value(daysEventObject)
var eventObjectLiteral = {

}

function deleteEvent() {
	var liElementHolder = $(this).closest('li')
	var weekHolder = $(this).closest('.week-display');
	var fullDate = weekHolder.data('monthval') + " " + $(this).closest('.calendar-cell').data('date') + ", " + weekHolder.data('yearval');
	var eventObject = eventObjectLiteral[fullDate];
	var itemToDelete = liElementHolder.text();
	var eventObject = eventObjectLiteral[fullDate]
	eventObject.deleteEvent(itemToDelete);
	liElementHolder.remove()
}

function addEvent() {
	var inputBox = $(this).parent().find('input')
	var inputText = inputBox.val();
	inputBox.val('');
	if (inputText) {
		var listOfEvents = $(this).closest('.calendar-cell').find('ul');
		listOfEvents.append("<li>" + inputText + "<button class='delete-event'></button></>");
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