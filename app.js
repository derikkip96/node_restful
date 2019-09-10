const express = require('express');
const logger = require('morgan');
const csurf = require('csurf');
const bodyParser = require('body-parser');
require('./config/database/db');
const path = require('path');
const http = require('http');
const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
  });

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 




const Customer = require('./controllers/customerControllers');
const Product = require('./controllers/productControllers');
const Category = require('./controllers/categoryControllers');

const CustomerRoutes = require('./routes/customers');
const categoriesRoute = require('./routes/category');
const productsRoute = require('./routes/products');
app.use('/customers',CustomerRoutes);
app.use('/categories',categoriesRoute);
app.use('/products',productsRoute);

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
