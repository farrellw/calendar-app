function loadWeeklyView(inputCell){
	if (inputCell > 0 && inputCell <= 36) {
		inputCell = inputCell - 1
		var selector = ".calendar td:eq("+ inputCell + ")"
		var $object = $(selector);
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