const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const CookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

// middleware
app.use(cors());
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "/views"));
// app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);

app.use(
  CookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(cookieParser());

//auth routes
app.use("/user", userRoutes);
app.use("/prescription", prescriptionRoutes);

module.exports = app;
