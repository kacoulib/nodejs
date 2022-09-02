import session from "express-session";
import route from "./routes/routes";
import flash from "connect-flash";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const {
  APP_LOCALHOST: hostname,
  APP_PORT: port,
  APP_ADDRESS_MONGOOSE,
  APP_COLLECTION_MONGOOSE,
} = process.env;

mongoose
  .connect(`mongodb://${APP_ADDRESS_MONGOOSE}/${APP_COLLECTION_MONGOOSE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(init);

function init() {
  const app = express();

  // variable de session
  app.use(
    session({
      secret: "register123",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.flash_message = req.flash("success_message");
    res.locals.messages = [];
    next();
  });

  app.use(express.static(__dirname + "/public"));
  app.set("view engine", "ejs");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", route);

  app.listen(port, () => {
    console.log(`Example app listening at http://${hostname}:${port}`);
  });
}
