const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const CookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
// app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  CookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(cookieParser());

// middleware

//auth routes
app.use("/api/auth", userRoutes);

module.exports = app;
