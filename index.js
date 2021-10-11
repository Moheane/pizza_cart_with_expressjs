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
	small = cart.stotal();
	medium = cart.mtotal();
	large = cart.ltotal();
	gtotal = cart.gtotal();
	sqt = cart.smallqty();
	mqt = cart.mediumqty();
	lqt = cart.largeqty();
	console.log(small)
	res.render('index', {
		small : small,
		medium : medium,
		large: large,
		gtotal: gtotal,
		sqt: sqt,
		mqt: mqt,
		lqt: lqt
	});
});

app.post('/buySmall', function(req, res) {
	btn = req.body.buybtn
	cart.buysmall(btn)
	console.log(cart.buysmall())
	console.log(btn)
	
	// res.render('index', {buy:buy})
	res.redirect('/')
});

app.post('/buyMedium', function(req, res) {
	
	btn = req.body.buybtn
	cart.buymedium(btn)
	console.log(cart.buymedium())
	
	//res.render('index', {buy:buy})
	res.redirect('/')
});

app.post('/buyLarge', function(req, res) {
	btn = req.body.buybtn
	cart.buylarge(btn)
	console.log(cart.buylarge())
	
	//res.render('index', {buy:buy})
	res.redirect('/')
});

app.post('/add_small', function(req, res) {
	cart.addsmall();
	console.log(cart.buysmall())
	
	res.redirect('/')
});

app.post('/add_medium', function(req, res) {
	cart.addmedium();
	console.log(cart.buysmall())
	
	res.redirect('/')
});

app.post('/add_large', function(req, res) {
	cart.addlarger();
	
	res.redirect('/')
});

app.post('/minus_small', function(req, res) {
	cart.minussmall();
	res.redirect('/')
});

app.post('/minus_medium', function(req, res) {
	cart.minusmedium();
	res.redirect('/')
});

app.post('/minus_large', function(req, res) {
	cart.minuslarger();
	res.redirect('/')
});


// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});
