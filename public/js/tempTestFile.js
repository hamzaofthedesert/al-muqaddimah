// public/js/tempTestFile.js
fetch('http://localhost:3000/calendar')
  .then(response => response.json())
  .then(data => {
    const calendar = data;  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

    calendar.forEach(row => {
      const date = new Date(row.date);
      date.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

      if (date < today) {
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).format(date);
        console.log(formattedDate);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching calendar data:', error);
  });