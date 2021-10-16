const express = require("express");
const exphbs = require("express-handlebars");
const pcart = require("./pizza-cart");
const session = require("express-session");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const PORT = process.env.PORT || 3019;

const cart = pcart();

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable the static folder...
app.use(express.static("public"));

// add more middleware to allow for templating support

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

var dis1 = "";
var dis2 = "";
var dis3 = "";

open({
  filename: "./sqlit.db",
  driver: sqlite3.Database,
}).then(async function (db) {
  // run migrations

  await db.migrate();

  // only setup the routes once the database connection has been established

  app.get("/", async function (req, res) {
    var setsession = req.session.username;
    if (setsession) {
      small = cart.stotal();
      medium = cart.mtotal();
      large = cart.ltotal();
      gtotal = cart.gtotal();
      sqt = cart.smallqty();
      mqt = cart.mediumqty();
      lqt = cart.largeqty();
      hid = cart.hidev();
      // disable = cart.disablingv();

      res.render("index", {
        small: small,
        medium: medium,
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
        setsession: setsession,
      });
    } else {
      res.redirect("/login");
    }
  });

  app.post("/buyaction", function (req, res) {
    btn = req.body.buybtn;
    hide = "";
    console.log(btn);

    if (btn === "smallBtn") {
      dis1 = "disabled";
      cart.hiderem();
      cart.addsmall();
    } else if (btn === "mediumBtn") {
      dis2 = "disabled";
      cart.hiderem();
      cart.addmedium();
    } else if (btn === "largeBtn") {
      dis3 = "disabled";
      cart.hiderem();
      cart.addlarger();
    } else {
    }
    {
    }
    res.redirect("/");
  });

  app.post("/add_small", function (req, res) {
    cart.addsmall();
    // console.log(cart.buysmall())

    res.redirect("/");
  });

  app.post("/add_medium", function (req, res) {
    cart.addmedium();
    // console.log(cart.buysmall())

    res.redirect("/");
  });

  app.post("/add_large", function (req, res) {
    cart.addlarger();

    res.redirect("/");
  });

  app.post("/minus_small", function (req, res) {
    cart.minussmall();
    res.redirect("/");
  });

  app.post("/minus_medium", function (req, res) {
    cart.minusmedium();
    res.redirect("/");
  });

  app.post("/minus_large", function (req, res) {
    cart.minuslarger();
    res.redirect("/");
  });

  // app.get('/order', function(req, res) {
  // 	console.log('order page get')
  // 	res.render('order')
  // });

  app.post("/order", async function (req, res) {
    d1 = req.body.gtotal;
    let payment = cart.getpayingstring();

    let username = req.session.username;
    console.log(username);
    a = await db.run(
      "insert into ordertbable(username, order_status, payment) values (?, ?, ?)",
      username,
      payment,
      d1
    );
    cart.orderregister();
    res.redirect("/order");
  });

  app.get("/order", async function (req, res) {
    pays = cart.getpayingstring();
    hide = cart.getshowbtn();
    orders = await db.all(
      "select * from ordertbable where username = ?",
      req.session.username
    );


    res.render("order", {
      orders: orders,
      pays: pays,
      hide: hide,
    });
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.post("/login", function (req, res) {
    if (req.body.username) {
      req.session.username = req.body.username;
      res.redirect("/");
      
      console.log(req.session.username);
    } else {
      res.redirect("/login");
      
      console.log(req.session.username);
    }
  });

  app.post("/refresh", function (req, res) {
    cart.clearcart();
    res.redirect("/");
  });

  app.post("/orderaction/:id", async function (req, res) {
    dataform = req.params.id;
	bc = await db.get(
        "select order_id from ordertbable where order_id =?", 59
      );
    if (req.body.orderbtn === "pay") {
      console.log(dataform+ "pressed pay id " + bc);
      results = await db.exec(
        "update ordertbable set order_status=? where order_id =?",
        "collect",
        dataform
      );
    } else if (req.body.orderbtn === "collect") {
      console.log("pressed collect");
      results = await db.exec(
        "update ordertbable set order_status=? where order_id =?",
        "collect",
        dataform
      );
	  
    }

    // a = cart.getpayingstring()
    // cart.payingstring()
    // console.log('pay button page ' + a)
    res.redirect("/order");
  });
});

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});
