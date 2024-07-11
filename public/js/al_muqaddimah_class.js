function al_muqaddimah(){

    this.calendarInfo = {
        startDate: '',
        endDate: ''
    }
    // highlights the day passed based on startdate and current date
    this.highlight_day_passed = function(){
        const today = new Date();
        const table = document.getElementById('calendar').querySelector('table');
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const dateCell = row.cells[1];
            const date = new Date(dateCell.textContent.trim());
            if(date < today){
                row.style.backgroundColor = 'green';
            }
        });
    }
}