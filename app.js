const express = require('express');
const logger = require('morgan');
const csurf = require('csurf');
const bodyParser = require('body-parser');
require('./config/database/db');

const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 




const Customer = require('./controllers/customerControllers');



app.use('/customer', Customer);

app.get('/', (req, res) =>
	res.status(200).send({
		message: 'Urban Salon',
	})
);


const port = parseInt(process.env.PORT, 10) || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(process.env.PORT || port, function() {
	console.log('Your node js server is running');
});

module.exports = app;
