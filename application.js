$(document).ready(function() {
	initialPageLoad();
	$('.calendar').on('click', '.calendar-cell', switchToWeeklyView);
	$('.navigation-buttons').on('click', 'button', navigate);
	$('.change-view-buttons').on('click', 'button', changeView);
});

function navigate() {
	var attachedClass = $(this).attr("class");
	var typeOfView = $('.calendar').data("type")
	if (typeOfView == "month") {
		var currentMonth = $('.calendar').data("month");
		var currentYear = $('.calendar').data("year");
		if (attachedClass == "next") {
			if (currentMonth <= 11) {
				var monthToDisplay = currentMonth + 1;
				var yearToDisplay = currentYear;
			} else {
				var monthToDisplay = 1;
				var yearToDisplay = currentYear + 1;
			}
			var dateToSwitch = monthToDisplay + ' 1, ' + yearToDisplay;
			loadMonthView(new Date(dateToSwitch));
		}else if (attachedClass == "previous") {
			if (currentMonth <= 1) {
				var monthToDisplay = 12;
				var yearToDisplay = currentYear - 1;
			} else {
				var monthToDisplay = currentMonth - 1;
				var yearToDisplay = currentYear;
			}
			var dateToSwitch = monthToDisplay + ' 1, ' + yearToDisplay;
			loadMonthView(new Date(dateToSwitch));
		}
	}else if (typeOfView == 'week') {
		var currentMonth = $('.calendar').data("month");
		var currentYear = $('.calendar').data("year");
		var currentDay = $('.calendar table').find('td').first();
		var currentDayNumber = parseInt(currentDay.text()) || 0;
		console.log(currentDayNumber);
		var firstOfMonth = currentMonth + ' 1,' + currentYear;
		var startDate = new Date(firstOfMonth);
		var daysIntoWeek = startDate.getDay();
		var currentIndex = currentDayNumber + daysIntoWeek;
		console.log("Current Index Follows");
		console.log(currentIndex);
		console.log("Current Month Follows")
		console.log(currentMonth);
		var totalDays = daysInMonth(currentMonth, daysByMonth);
		console.log("Total days next")
		console.log(totalDays);
		if (attachedClass == "next") {
			// Keep track of index
			// Keep track of day #

			var targetIndex = currentIndex += 7
			targetDayNumber = currentDayNumber + 7;
			if (targetDayNumber < totalDays) {
				
			} else {
				console.log("Going up a month");
				targetDayNumber = 1;
				targetIndex = 1;
				currentMonth = currentMonth + 1;
				if (currentMonth > 12) {
					currentMonth = 1;
					currentYear = currentYear+ 1;
				}
			}
			var dateToSwitch = currentMonth + ' ' + (targetDayNumber) + ', ' + currentYear;
		} else if (attachedClass == "previous") {
			var targetIndex = currentIndex - 7
			console.log("Target Index Follows");
			console.log(targetIndex);
			targetDayNumber = currentDayNumber - 7
			if (targetDayNumber >= 1) {

			} else if (targetIndex >= 1 && targetDayNumber < 0) {
				console.log("In middle loop")
				targetDayNumber = 1;
				targetIndex = daysIntoWeek;

			}else {
				console.log("Going back a month");
				currentMonth = currentMonth - 1;
				if (currentMonth < 1) {
					currentMonth = 12;
					currentYear = currentYear - 1;
				}
				targetDayNumber = daysInMonth(currentMonth, daysByMonth) - 1;
				firstOfMonth = currentMonth + " 1, " + currentYear;
				var startDate = new Date(firstOfMonth);
				var daysIntoWeek = startDate.getDay();
				console.log("How many days into week we have");
				console.log(daysIntoWeek);
				targetIndex = parseInt(daysIntoWeek) + targetDayNumber;
			}
			var dateToSwitch = currentMonth + ' ' + (targetDayNumber) + ', ' + currentYear;
		}
		console.log("Date to switch there is next:")
		console.log(dateToSwitch);
		loadMonthView(new Date(dateToSwitch));
		// currentDayNumber = parseInt(currentDayNumber) + 7;
		console.log("Target index is next:")
		console.log(targetIndex);
		switchToWeeklyView(targetIndex);
	}
}

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