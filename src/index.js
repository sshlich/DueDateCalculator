'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const port = 8080;
const host = '0.0.0.0';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});

app.listen(port, host);
console.log(`running on http://${host}:${port}`);