const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.listen(3000, () => console.log('Listening on port 3000'));
