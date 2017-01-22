$(document).ready(function() {
	initialPageLoad();
	$('.calendar').on('dblclick', '.calendar-cell', loadWeeklyView);
	$('.navigation-buttons').on('click', 'button', navigate);
	$('.change-view-buttons').on('click', 'button', changeView);
	$('.calendar').on('click', '.add-event', addEvent);
	$('.calendar').on('click', '.delete-event', deleteEvent);
});

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

function changeView() {
	var switchTo = $(this).data("type");
	var month = $('.calendar').data("month");
	var year = $('.calendar').data("year");
	if (switchTo == "week") {
		loadWeeklyView(1);
	} else if (switchTo == "month") {
		var dateToSwitch = month + " 1, " + year;
		loadMonthView(new Date(dateToSwitch));
	}
}

function daysInMonth(month, datePossibilities) {
	if (datePossibilities[month]) {
		return datePossibilities[month];
	} else {
		return 31;
	}
}

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

const daysByMonth = {
	4: 30,
	6: 30,
	9: 30,
	11: 30,
	2: 28
}

const daysOfWeek = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday",
}