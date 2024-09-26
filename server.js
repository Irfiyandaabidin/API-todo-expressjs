require("dotenv").config();

const cors = require("cors");
const swaggerDocs = require("./swagger");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const { values } = require("@babel/runtime/regenerator");
var express = require("express");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const basicAuth = require("express-basic-auth");

const AuthMiddleware = require("./middleware/auth.middleware");

let port = process.env.APP_PORT || "8000";
let host = process.env.APP_HOST || "localhost";

const csrfProtection = csurf({
  cookie: true,
 });
var app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/project", csrfProtection);

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({
      message: 'Invalid CSRF token'
    });
  } else {
    next(err);
  }
});

app.use("/upload/images", express.static(path.join(__dirname, 'upload/images')));
app.set("view engine", "hbs");
app.set("views", "./views");

routes(app, "/");

app.use(['/docs'], basicAuth({
  users: {'training': 'training'},
  challenge: true
}))
swaggerDocs.swagger(app);

app.get("/", (req, res) => {
  res.render("welcome", {
    text: "Hello, It's Work!",
  });
});

app.listen(port, () => {
  console.log(`listening on http://${host}:${port}`);
});
