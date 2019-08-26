const express = require('express');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const logger = require('morgan');

require('./config/database/db');

const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const expressValidator = require('express-validator');
app.use(expressValidator);

//requiring controllers and the models
const Customer = require('./controllers/customerControllers');

//requiring models
require('./models/Customer');
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

app.use()