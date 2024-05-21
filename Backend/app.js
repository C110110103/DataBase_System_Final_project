var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const initialDatabase = require("./tools/initialDataBase").initialDatabase;

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var formsRouter = require("./routes/forms");
const passport = require("passport");
require("./util/passport")(passport);

var app = express();

// 改寫
var http = require("http");
var server = http.createServer(app);

const allowedOrigins = ["http://localhost:7777"];

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(
  "/forms",
  passport.authenticate("jwt", { session: false }),
  formsRouter
);

initialDatabase()
  .then(() => {
    // 在数据库初始化完成后再启动服务器监听端口
    server.listen("3000");
  })
  .catch((error) => {
    console.error("Error initializing database: ", error);
  });
