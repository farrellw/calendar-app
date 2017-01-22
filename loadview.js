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
	monthDisplay = $('.calendar').find('table').first();
	for (var i = 0; i < 6; i++) {
		monthDisplay.append("<tr class='month-row'></tr>");
		monthRow = monthDisplay.find("tr").last();
		for (var j = 0; j < 7; j++) {
			if (dateStart >= 1 && dateStart <= daysToDisplay) {
				var dateToCheckEvents = month + " " + dateStart + ", " + year;
				monthRow.append("<td class='calendar-cell'><div class='cell-header'>" + dateStart + "</div><div class='cell-body'><p></p></div></td>");
				if (eventObjectLiteral[dateToCheckEvents]) {
					var eventsToPutInCell = eventObjectLiteral[dateToCheckEvents].numberOfEvents() + " events";
				} else {
					var eventsToPutInCell = " ";
				}
				$('.calendar').find('p').last().text(eventsToPutInCell);
				dateStart = dateStart + 1;
			}
			else {
				monthRow.append("<td class='calendar-cell out-of-month'><div class='cell-header'></div></td>");
				dateStart = dateStart + 1;
			}
		}
		// if (dateStart > daysToDisplay){
		// 	break;
		// }
	}
	monthDisplay.prepend("<tr class='month-headers'></tr>")
	calendarHeaders = monthDisplay.find("tr").first();
	for (var i = 0; i < 7; i++) {
		calendarHeaders.append("<th class='calendar-header'>" + daysOfWeek[i] + "</th>");
	}
}

function loadWeeklyView(inputCell){
	var month = $('.calendar').data("month");
	var year = $('.calendar').data("year");
	var firstOfMonth = month + ' 1,' + year;
	var startDate = new Date(firstOfMonth);
	var daysIntoWeek = startDate.getDay();
	if (inputCell >= 0 && inputCell <= 36) {
		var selector = ".calendar td:eq("+ inputCell + ")";
		var $object = $(selector);
	} else {
		var cellNumber = parseInt($(this).find('.cell-header').text())
		var inputCell = cellNumber + parseInt(daysIntoWeek) - 1;
		var selector = ".calendar td:eq("+ inputCell + ")";
		var $object = $(selector);
	}
	var daysIntoWeek = startDate.getDay() + 1
	var week = $object.parent();
	var firstDayOfWeek = parseInt(week.find('.cell-header').first().text());
	if (!firstDayOfWeek) {
		firstDayOfWeek = 0 - inputCell + 1;
	}
	$('.calendar').empty();
	$('.calendar').data("type", "week");
	$('.calendar').append("<table class='week-display' data-monthval='" + month + "' data-yearval='" + year + "'></table>");
	var table = $('.calendar').children().first();
	var firstOfMonth = month + ' 1,' + year;
	var startDate = new Date(firstOfMonth);
	var daysIntoWeek = startDate.getDay() + 1;
	table.prepend("<tr class='week-view-row'></tr>");
	var weekRow = table.find("tr").first();
	var daysPossible = daysInMonth(month, daysByMonth)
	for (var i = 0; i < 7; i++) {
		var dayOfMonth = firstDayOfWeek + i;
		if (dayOfMonth > 0 && dayOfMonth <= daysPossible){
			weekRow.append("<td class='calendar-cell' data-date=" + dayOfMonth + "><div class='cell-header'>" + dayOfMonth + " - " + daysOfWeek[i] + "</div><div class='cell-body'><ul></ul></div><div class='add-events-div'><input type='text' name='new-event'><br><button class='add-event'>Add Event</button></div></td>");
			var eventHolder = weekRow.find('ul').last()
			var dateToCheckEvents = month + " " + dayOfMonth + ", " + year;
			if (eventObjectLiteral[dateToCheckEvents]) {
				var events = eventObjectLiteral[dateToCheckEvents].events;
			} else {
				var events = [];
			}
			for (var j = 0; j < events.length; j++) {
				eventHolder.append("<li>" + events[j] + "<br><button class='delete-event'></button><button class='edit-event'></button></li>");
			}
		} else {
			weekRow.append("<td class='calendar-cell out-of-month'></td>");
		}
	}
}
