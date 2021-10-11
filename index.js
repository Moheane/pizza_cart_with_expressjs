const express = require('express');
const exphbs  = require('express-handlebars');
const pcart = require('./pizza-cart')

const app = express();
const PORT =  process.env.PORT || 3019;

const cart = pcart();

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
	let buy = ''
	res.render('index', {
		buy:buy
	});
});

app.post('/buy', function(req, res) {
	// remove = cart.buy()
	let buy = 'hidden'
	res.redirect('/')
	// res.render('index', {buy:buy})
});


// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});
