const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const session = require("express-session");
const passport = require("passport");
const { cars } = require("./db/cars");
const passportLocalMongoose = require("passport-local-mongoose");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(express.static("public"));

app.use(
  session({
    secret: "This is a secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/crmsDB",
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (err) console.log(err);
      else console.log("connected to mongoDB");
    }
  );
};
connectDB();
const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});
const cartSchema = new mongoose.Schema({
  car_id: Number,
  hours: Number,
  distance: Number,
  price: Number,
  source: String,
  destination: String,
  carInfo: Array,
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
const Cart = mongoose.model("Cart", cartSchema);
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("home", { signedIN: true, usrDetails: currentUser });
    })();
  } else {
    res.render("home", { signedIN: false, usrDetails: null });
  }
});
app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("login", { signedIN: true, usrDetails: currentUser });
    })();
  } else {
    res.render("login", { signedIN: false, usrDetails: null });
  }
});
app.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("register", { signedIN: true, usrDetails: currentUser });
    })();
  } else {
    res.render("register", { signedIN: false, usrDetails: null });
  }
});
app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});
app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});
app.post("/register", (req, res) => {
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.register({ username: username }, password, (err, user) => {
    if (err || confirmPassword !== password) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
});
app.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/bookings", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    let orders;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      orders = await Cart.find();
      function calcTotal() {
        let total = 0;
        for (let i = 0; i < orders.length; i++) {
          total += parseInt(orders[i].price);
        }
        return total;
      }
      let total = calcTotal();

      console.log(orders);
      res.render("bookings", {
        signedIN: true,
        usrDetails: currentUser,
        orders: orders,
        totalPrice: total,
      });
    })();
  } else {
    res.redirect("/login");
  }
});
app.get("/rent", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("rent", {
        signedIN: true,
        usrDetails: currentUser,
        cars: cars,
      });
    })();
  } else {
    res.render("rent", { signedIN: false, usrDetails: null, cars: cars });
  }
});
app.get("/form", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("form", { signedIN: true, usrDetails: currentUser });
    })();
  } else {
    res.render("form", { signedIN: false, usrDetails: null });
  }
});
function calcPrice(car_id) {
  var p = 0;
  // console.log(cars);

  for (let i = 0; i < cars.length; i++) {
    console.log("cars id: " + cars[i].id + " car_id: " + car_id);
    if (parseInt(car_id) === parseInt(cars[i].id)) {
      console.log("Func run");
      return cars[i].price;
    }
  }
}

app.post("/addtocart", (req, res) => {
  const car_id = req.body.car_id;
  const hours = req.body.hours;
  const distance = req.body.distance;
  const source = req.body.from;
  const destination = req.body.to;
  const price = calcPrice(car_id);
  const carInfo = cars.filter((car) => car.id === parseInt(car_id))[0];

  const newCart = new Cart({
    car_id: car_id,
    hours: hours,
    distance: distance,
    price: price,
    source: source,
    destination: destination,
    carInfo: carInfo,
  });

  newCart.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("added to cart");
      console.log(newCart);
      res.redirect("/bookings");
    }
  });
});
app.post("/book", (req, res) => {
  const id = req.body.id;
  console.log(id);
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("form", {
        signedIN: true,
        usrDetails: currentUser,
        car_id: id,
      });
    })();
  } else {
    res.redirect("/login");
  }
});
app.post("/success", (req, res) => {
  if (res.statusCode !== 200) {
    res.redirect("/success");
  } else {
    res.redirect("/failure");
  }
});
app.get("/success", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("success", {
        signedIN: true,
        usrDetails: currentUser,
      });
    })();
  } else {
    res.redirect("/login");
  }
});
app.get("/failure", (req, res) => {
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("failure", {
        signedIN: true,
        usrDetails: currentUser,
      });
    })();
  } else {
    res.redirect("/login");
  }
});
app.post("/pay", (req, res) => {
  const total = req.body.totalPrice;
  if (req.isAuthenticated()) {
    let currentUser;
    (async () => {
      currentUser = await User.findOne({ username: req.user.username });
      console.log(currentUser);
      res.render("payment", {
        signedIN: true,
        usrDetails: currentUser,
        total: total,
      });
    })();
  } else {
    res.redirect("/login");
  }
});
app.post("/cancel", (req, res) => {
  const id = req.body.id;
  console.log(id);
  (async () => {
    await Cart.deleteOne({ _id: id });
    res.redirect("/bookings");
  })();
});
app.listen(PORT, function (req, res) {
  console.log("Server is running on port " + PORT);
});
