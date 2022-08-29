require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const csrf = require("csurf");
const { limiter } = require("./utils/rateLimiter");

const { productRouter } = require("./routes/product");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
const { wishlistRouter } = require("./routes/wishlist");
const { reviewRouter } = require("./routes/review");
const { discountRouter } = require("./routes/discount");

//Conf
const CORS =
  process.env.MODE === "DEV"
    ? "http://localhost:3000"
    : "https://aledrogoshop.netlify.app";

const COOKIE_SETTINGS =
  process.env.MODE === "DEV"
    ? { sameSite: true, httpOnly: false }
    : { sameSite: "none", secure: true };
const app = express();

//MongoDB Connect
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.info("Mongoose Is Connected");
  }
);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(
  cors({
    origin: CORS,
    credentials: true,
  })
);

process.env.MODE === "DEV" && app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: COOKIE_SETTINGS,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

//Routes
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("/wishlist", wishlistRouter);
app.use("/codes", discountRouter);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.info(
    `Express listening on http://${process.env.HOST}:${process.env.PORT}`
  )
);
