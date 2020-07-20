'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { calculator } = require('./calc-time');

const port = 8080;
const host = '0.0.0.0';
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    if (req.body.exit == 1) {
        res.send(200);
        process.exit(0);
    }

    if (calculator(req.body.submitDate, req.body.turnaroundTime) == 'Invalid Date') {
        res.send(`\nYou sent invalid date!\n\n`);
    } else res.send(`\nSubmitted date is: ${new Date(req.body.submitDate).toLocaleString("en-US", options)}\n`+
        `Turnaround time is: ${req.body.turnaroundTime} hours\n`+
        `Date when resolved is: ${calculator(req.body.submitDate, req.body.turnaroundTime).toLocaleString("en-US", options)}\n\n`);
});

app.listen(port, host);
console.log(`running...`);