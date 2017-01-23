function changeWeek(direction) {
	var currentMonth = $('.calendar').data("month");
	var currentYear = $('.calendar').data("year");
	var currentDay = $('.calendar table').find('.cell-header').first();
	var currentDayNumber = parseInt(currentDay.text()) || 0;
	var firstOfMonth = currentMonth + ' 1,' + currentYear;
	var startDate = new Date(firstOfMonth);
	var daysIntoWeek = startDate.getDay();
	var currentIndex = currentDayNumber - 1 +  daysIntoWeek;
	var totalDays = daysInMonth(currentMonth, daysByMonth);
	if (direction == "next") {
		var targetIndex = currentIndex += 7;
		targetDayNumber = currentDayNumber + 7;
		if (targetDayNumber <= totalDays) {
			
		} else {
			targetDayNumber = 1;
			targetIndex = 0;
			currentMonth = currentMonth + 1;
			if (currentMonth > 12) {
				currentMonth = 1;
				currentYear = currentYear+ 1;
			}
			var firstOfMonth = currentMonth + ' 1,' + currentYear;
			var startDate = new Date(firstOfMonth);
			var daysIntoWeek = startDate.getDay();
			targetIndex = targetIndex + daysIntoWeek;
		}
		var dateToSwitch = currentMonth + ' ' + (targetDayNumber) + ', ' + currentYear;
	} else if (direction == "previous") {
		var targetIndex = currentIndex - 7;
		targetDayNumber = currentDayNumber - 7;
		if (targetDayNumber >= 1) {

		} else if (targetIndex >= 0 && targetDayNumber < 0) {
			targetDayNumber = 1;
			targetIndex = daysIntoWeek;

		}else {
			currentMonth = currentMonth - 1;
			if (currentMonth < 1) {
				currentMonth = 12;
				currentYear = currentYear - 1;
			}
			targetDayNumber = daysInMonth(currentMonth, daysByMonth);
			firstOfMonth = currentMonth + " 1, " + currentYear;
			var startDate = new Date(firstOfMonth);
			var daysIntoWeek = startDate.getDay();
			targetIndex = parseInt(daysIntoWeek) + targetDayNumber - 1;
		}
		var dateToSwitch = currentMonth + ' ' + (targetDayNumber) + ', ' + currentYear;
	}
	return [dateToSwitch, targetIndex];
}

function changeMonth(direction){
	var currentMonth = $('.calendar').data("month");
	var currentYear = $('.calendar').data("year");
	if (direction == "next") {
		if (currentMonth <= 11) {
			var monthToDisplay = currentMonth + 1;
			var yearToDisplay = currentYear;
		} else {
			var monthToDisplay = 1;
			var yearToDisplay = currentYear + 1;
		}
		var dateToSwitch = monthToDisplay + ' 1, ' + yearToDisplay;
	}else if (direction == "previous") {
		if (currentMonth <= 1) {
			var monthToDisplay = 12;
			var yearToDisplay = currentYear - 1;
		} else {
			var monthToDisplay = currentMonth - 1;
			var yearToDisplay = currentYear;
		}
		var dateToSwitch = monthToDisplay + ' 1, ' + yearToDisplay;
	}
	return dateToSwitch;
}