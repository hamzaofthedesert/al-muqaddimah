const express = require('express');
const router = express.Router();
const generateCalendar = require('../services/calendarGenerator');
// Serve the index.html file
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// // New route for generating the calendar
router.get('/calendar', (req, res) => {
    const startDate = new Date('2024-07-02');
    const endDate = new Date('2024-08-22');
    const calendar = generateCalendar(startDate, endDate);
    res.json(calendar); 
});

module.exports = router;
