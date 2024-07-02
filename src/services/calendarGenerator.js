// src/calendarGenerator.js

/**
 * Generates a calendar between the given start and end dates.
 *
 * @param {Date} startDate - The start date of the calendar.
 * @param {Date} endDate - The end date of the calendar.
 * @return {Array} An array of objects representing each day in the calendar, 
 *                 with properties 'day' and 'date'.
 */
function generateCalendar(startDate, endDate) {
    const calendar = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        //const formattedDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        calendar.push({
            day: calendar.length + 1,
            date: formattedDate
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
}

module.exports = generateCalendar;