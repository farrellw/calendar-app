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
	var startDate = new Date(firstOfMonth);
	var daysIntoWeek = startDate.getDay();
	daysToDisplay = daysInMonth(month, daysByMonth);
	dateStart = 1 - daysIntoWeek;
	$('.month-label').text(monthNames[month - 1] + " - " + year);
	$('.calendar').data('month', month);
	$('.calendar').data('date', date);
	$('.calendar').data('year', year);
	$('.calendar').append("<table class='month-display'></table>");
	monthDisplay = $('.calendar').children().first();
	for (var i = 0; i < 6; i++) {
		monthDisplay.append("<tr class='month-row'></tr>");
		monthRow = monthDisplay.find("tr").last();
		for (var j = 0; j < 7; j++) {
			if (dateStart >= 1 && dateStart <= daysToDisplay) {
				var dateToCheckEvents = month + " " + dateStart + ", " + year;
				

				monthRow.append("<td class='calendar-cell'><div class='cell-header'>" + dateStart + "</div><div class='cell-body'></div></td>");
				if (eventObjectLiteral[dateToCheckEvents]) {
					var eventsToPutInCell = eventObjectLiteral[dateToCheckEvents].numberOfEvents();
				} else {
					var eventsToPutInCell = 0;
				}
				$('.calendar').find('.cell-body').last().text(eventsToPutInCell);
				dateStart = dateStart + 1;
			}
			else {
				monthRow.append("<td class='calendar-cell'></td>");
				dateStart = dateStart + 1;
			}
		}
	}
	monthDisplay.prepend("<tr class='month-headers'></tr>")
	calendarHeaders = monthDisplay.find("tr").first();
	for (var i = 0; i < 7; i++) {
		calendarHeaders.append("<th class='calendar-header'>" + daysOfWeek[i] + "</th>");
	}
}

function loadWeeklyView(inputCell){
	if (inputCell > 0 && inputCell <= 36) {
		inputCell = inputCell - 1;
		var selector = ".calendar td:eq("+ inputCell + ")";
		var $object = $(selector);
	} else {
		var $object = $(this);
	}
	// $('.calendar').attr('data-date', date);
	var month = $('.calendar').data("month");
	var year = $('.calendar').data("year");
	// var dayOfMonth = parseInt($object.children().first().text());
	var week = $object.parent();
	var firstDayOfWeek = parseInt(week.find('.cell-header').first().text());
	$('.calendar').empty();
	$('.calendar').data("type", "week");
	$('.calendar').append("<table class='week-display' data-monthval='" + month + "' data-yearval='" + year + "'></table>");
	var table = $('.calendar').children().first();

	var firstOfMonth = month + ' 1,' + year;
	var startDate = new Date(firstOfMonth);
	var daysIntoWeek = startDate.getDay() + 1;
	table.prepend("<tr class='week-view-row'></tr>");
	var weekRow = table.find("tr").first();
	console.log("Am I in a loop?")
	for (var i = 0; i < 7; i++) {
		var dayOfMonth = firstDayOfWeek + i;
		weekRow.append("<td class='calendar-cell'><div class='cell-header'>" + (dayOfMonth + i) + " - " + daysOfWeek[i] + "</div><div class='cell-body'><ul></ul></div></td>");
		var eventHolder = weekRow.find('ul').last()
		var dateToCheckEvents = month + " " + dayOfMonth + ", " + year;
		if (eventObjectLiteral[dateToCheckEvents]) {
			var events = eventObjectLiteral[dateToCheckEvents].events;
		} else {
			var events = [];
		}
		for (var j = 0; j < events.length; j++) {
			eventHolder.append("<li>" + events[j] + "</>");
		}
	}
}
