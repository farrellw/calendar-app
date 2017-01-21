$(document).ready(function() {
	initialPageLoad();
	$('.calendar').on('click', '.calendar-cell', switchToWeeklyView);
	$('.change-view-buttons').on('click', 'button', changeView);
});

function changeView() {
	var switchTo = $(this).data("type");
	var month = $('.calendar').data("month");
	var year = $('.calendar').data("year");
	if (switchTo == "week") {
		switchToWeeklyView(1);

	} else if (switchTo == "month") {
		var dateToSwitch = month + " 1, " + year;
		loadMonthView(new Date(dateToSwitch));
	}
}

function switchToWeeklyView(inputCell){
	if (inputCell > 0 && inputCell <= 36) {
		inputCell = inputCell - 1
		var selector = ".calendar td:eq("+ inputCell + ")"
		var $object = $(selector);
		console.log("Object selected next")
		console.log($object.text());
	} else {
		var $object = $(this);
	}
	// $('.calendar').attr('data-date', date);
	var month = $('.calendar').data("month");
	var year = $('.calendar').data("year");
	var dayOfMonth = $object.text();
	var week = $object.parent();

	$('.calendar').empty();
	$('.calendar').data("type", "week");
	$('.calendar').append("<table class='week-display' data-monthval='" + month + "' data-yearval='" + year + "'></table>")
	var table = $('.calendar').children().first()
	table.prepend("<tr class='week-headers'></tr>")
	calendarHeaders = table.find("tr").first();
	for (var i = 0; i < 7; i++) {
		calendarHeaders.append("<th class='calendar-header'>" + daysOfWeek[i] + "</th>");
	}
	table.append(week);
}

function initialPageLoad() {
	loadMonthView(new Date());
}

function loadMonthView(date) {
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
	$('.month-label').text(monthNames[month - 1] + " - " + year)
	$('.calendar').data('month', month);
	$('.calendar').data('date', date);
	$('.calendar').data('year', year);
	$('.calendar').attr('data-month', month);
	$('.calendar').attr('data-date', date);
	$('.calendar').attr('data-year', year);
	$('.calendar').append("<table class='month-display'></table>");
	monthDisplay = $('.calendar').children().first();
	for (var i = 0; i < 6; i++) {
		monthDisplay.append("<tr class='month-row'></tr>")
		monthRow = monthDisplay.find("tr").last();
		for (var j = 0; j < 7; j++) {
			if (dateStart >= 1 && dateStart <= daysToDisplay) {
				var dateToCheckEvents = month + " " + dateStart + ", " + year
				console.log(dateToCheckEvents);
				monthRow.append("<td class='calendar-cell'><div class='cell-header'>" + dateStart + "</div><div class='cell-body'></div></td>")
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