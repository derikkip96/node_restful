const express = require('express');
const logger = require('morgan');
const csurf = require('csurf');
const bodyParser = require('body-parser');
require('./config/database/db');
const path = require('path');
const http = require('http');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 




const Customer = require('./controllers/customerControllers');
const Product = require('./controllers/productControllers');
const Category = require('./controllers/categoryControllers');

// const routes = require('./routes/router');
// app.use(routes);

app.use('/category',Category);
app.use('/customer', Customer);
app.use('/products',Product);

app.get('/', (req, res) =>
	res.status(200).send({
		message: 'Urban Salon',
	})
);

app.get('*', (req, res) => {
	res.status(404).send({
		message: "Page not found"
	})
})
//routes
// const categoriesroutes = require('./routes/category')
// app.use('/category',categoriesroutes);


const port = parseInt(process.env.PORT, 10) || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(process.env.PORT || port, function() {
	console.log('Your node js server is running');
});

module.exports = app;
