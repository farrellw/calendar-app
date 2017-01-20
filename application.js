$(document).ready(function() {
	initialPageLoad();
});

function initialPageLoad() {
	loadMonthView(new Date());
}

function loadMonthView(date) {
	console.log("In here")
	$('.calendar').empty();
	$('.calendar').data("type", "month");
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var day = date.getDay();
	var date = date.getDate();
	var firstOfMonth = month + ' 1,' + year;
	var startDate = new Date(firstOfMonth)
	var daysIntoWeek = startDate.getDay()
	daysToDisplay = daysInMonth(month, daysByMonth);
	dateStart = 1 - daysIntoWeek;
	$('.calendar').append("<table class='month-display'></table>");
	monthDisplay = $('.calendar').children().first();
	console.log("Ready to append")
	for (var i = 0; i < 6; i++) {
		monthDisplay.append("<tr class='month-row'></tr>")
		monthRow = monthDisplay.find("tr").last();
		for (var j = 0; j < 7; j++) {
			if (dateStart >= 1 && dateStart <= daysToDisplay) {
				monthRow.append("<td class='calendar-cell'>" + dateStart + "</td>")
				dateStart = dateStart + 1
			}
			else {
				monthRow.append("<td class='calendar-cell'></td>")
				dateStart = dateStart + 1
			}
		}
	}
	monthDisplay.prepend("<tr class='month-headers'></tr>")
	calendarHeaders = monthDisplay.find("tr").first();
	for (var i = 0; i < 7; i++) {
		calendarHeaders.append("<th class='calendar-header'>" + daysOfWeek[i] + "</th>")
	}
}

function daysInMonth(month, datePossibilities) {
	if (datePossibilities[month]) {
		return datePossibilities[month]
	} else {
		return 31
	}
}

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