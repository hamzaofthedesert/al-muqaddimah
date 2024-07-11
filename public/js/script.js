// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    fetchCalendarData();
});

/**
 * Fetches the calendar data from the server and generates a table 
 * with the day and date for each entry in the calendar.
 */
function fetchCalendarData() {
    fetch('/calendar')
        .then(response => response.json())
        .then(data => {
            const calendar = data;
            const calendarElement = document.getElementById('calendar');
            const table = createCalendarTable(calendar);
            calendarElement.innerHTML = table;
            setInterval(() => updateTimeBar(calendar), 60000);
        });
}

/**
 * Creates a table with the day and date for each entry in the calendar.
 * @param {Array} calendar - The calendar data.
 * @returns {string} - The HTML string for the table.
 */
function createCalendarTable(calendar) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let table = '<table class="table table-dark table-bordered"><thead><tr><th scope="col">Day</th><th scope="col">Date</th></tr></thead><tbody>';

    calendar.forEach(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        const { rowStyle, cellStyle, dayContent } = getRowStyles(entryDate, today, now);

        table += `<tr style="${rowStyle}">
                    <th scope="row" ${cellStyle}>${dayContent}</th>
                    <td ${cellStyle}>${entry.date}</td>
                  </tr>`;
    });

    table += '</tbody></table>';
    return table;
}

/**
 * Determines the styles for each row based on the entry date.
 * @param {Date} entryDate - The date of the calendar entry.
 * @param {Date} today - Today's date.
 * @param {Date} now - The current date and time.
 * @returns {Object} - The styles for the row.
 */
function getRowStyles(entryDate, today, now) {
    let rowStyle = '';
    let cellStyle = '';
    let dayContent = entryDate.toLocaleDateString('en-US', { weekday: 'long' });

    if (entryDate < today) {
        cellStyle = 'class="text-success"';
    } else if (entryDate.getTime() === today.getTime()) {
        const percentPassed = calculatePercentDayPassed(now);
        rowStyle = `position: relative; overflow: hidden;`;
        cellStyle = `class="text-warning" style="position: relative; z-index: 1;"`;
        dayContent = `<div style="position: absolute; top: 0; left: 0; height: 100%; width: ${percentPassed}%; background-color: rgba(255, 193, 7, 0.5); z-index: 0;"></div>${dayContent}`;
    }

    return { rowStyle, cellStyle, dayContent };
}

/**
 * Calculates the percentage of the day that has passed based on the current time.
 * @param {Date} now - The current date and time.
 * @returns {number} - The percentage of the day that has passed.
 */
function calculatePercentDayPassed(now) {
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const millisecondsPassed = now - midnight;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    return (millisecondsPassed / millisecondsInDay) * 100;
}

/**
 * Updates the time bar for the current day in the calendar.
 * @param {Array} calendar - The calendar data.
 */
function updateTimeBar(calendar) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const percentPassed = calculatePercentDayPassed(now);

    calendar.forEach((entry, index) => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);

        if (entryDate.getTime() === today.getTime()) {
            const row = document.querySelector(`#calendar table tbody tr:nth-child(${index + 1})`);
            const dayCell = row.querySelector('th');
            dayCell.querySelector('div').style.width = `${percentPassed}%`;
        }
    });
}