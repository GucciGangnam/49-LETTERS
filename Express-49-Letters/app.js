var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const generateString = require('./utils/generateString');
require('dotenv').config();
// Shemes
const Game = require("./models/game")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// Define CORS options
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: 'GET,POST,PUT',
  credentials: true,
  optionsSuccessStatus: 204
};
// Enable CORS with options
app.use(cors(corsOptions));

// Schedule the task to run every day at 00:00:01 UTC
// cron.schedule('1 0 * * *', () => {
//   const today = new Date();
//   generateString(today);
// }, {
//   timezone: "UTC"
// });


// // WHEN TEH SERVER TURN ON, RUN GERATE NEW STRING FOR EVERY DAY UNTIL THAT GAME ALREADY EXISTS
// const buildGames = async (date) => {
//   // Convert date to the required format
//   const formattedDate = date.toISOString().split('T')[0];
//   // Check if a game already exists for the given date
//   const game = await Game.findOne({ DATE: formattedDate });
//   if (game) {
//     // If a game exists, do nothing
//     console.log("game already exisists")
//     console.log(game)
//     return;
//   } else {
//     // If no game exists, generate a new string for the current date
//     console.log('building game')
//     generateString(date);
//     // Move to the previous day
//     const previousDate = new Date(date);
//     previousDate.setDate(date.getDate() - 1);
//     // Recursively call buildGames for the previous day
//     buildGames(previousDate);
//   }
// }
// // Call buildGames with today's date when the server starts
// const startDate = new Date();
// buildGames(startDate);






// SET MONGO CONNECTION //
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@49-letters.chgznxx.mongodb.net/49-letters?retryWrites=true&w=majority`

main().catch((err) => console.error(err));
async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB');
    // Get the list of all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    // Log the names of all collections
    collections.forEach((collection) => {
      console.log(collection.name);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
