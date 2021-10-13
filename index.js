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

var dis1 ='';
var dis2 ='';
var dis3 ='';
app.get('/', function(req, res) {
	small = cart.stotal();
	medium = cart.mtotal();
	large = cart.ltotal();
	gtotal = cart.gtotal();
	sqt = cart.smallqty();
	mqt = cart.mediumqty();
	lqt = cart.largeqty();
	hid = cart.hidev();
	// disable = cart.disablingv();

	
	res.render('index', {
		small : small,
		medium : medium,
		large: large,
		gtotal: gtotal,
		sqt: sqt,
		mqt: mqt,
		lqt: lqt,
		hid: hid,
		// disable: disable
		dis1: dis1,
		dis2: dis2,
		dis3: dis3,
	});
});

app.post('/buyaction', function(req, res) {
	btn = req.body.buybtn;
	hide = '';
	console.log(btn)
	
	if (btn === 'smallBtn') {
		dis1 = 'disabled'
		cart.hiderem();
		cart.addsmall();
		
	}
	else if (btn === 'mediumBtn') {
		dis2 = 'disabled'
		cart.hiderem()
		cart.addmedium();
		
		
	} else if (btn === 'largeBtn') {
		dis3 = 'disabled'
		cart.hiderem()
		cart.addlarger();
		
	} else {
		
	} {
		
	}
	res.redirect('/')
});

// app.post('/buyMedium', function(req, res) {
	
// 	btn = req.body.buybtn
// 	cart.buymedium(btn)
// 	console.log(cart.buymedium())
	
// 	//res.render('index', {buy:buy})
// 	res.redirect('/')
// });

// app.post('/buyLarge', function(req, res) {
// 	btn = req.body.buybtn
// 	cart.buylarge(btn)
// 	console.log(cart.buylarge())
	
// 	//res.render('index', {buy:buy})
// 	res.redirect('/')
// });

app.post('/add_small', function(req, res) {
	cart.addsmall();
	// console.log(cart.buysmall())
	
	res.redirect('/')
});

app.post('/add_medium', function(req, res) {
	cart.addmedium();
	// console.log(cart.buysmall())
	
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


app.post('/order', function(req, res) {
	console.log('order page')
	res.render('order')
});

app.get('/login', function(req, res) {
	res.render('login')
});

app.post('/login', function(req, res) {
	res.redirect('/')
});


// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});
