const express = require('express');
const {constructorMethod} = require('./routes');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const static = express.static(__dirname + "/public");
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main', // Default layout file (e.g., main.handlebars)
  partialsDir: path.join(__dirname, 'views/partials'), // Path to partials
}));
app.set('view engine', 'handlebars');

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use('/public', static);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));




// Configure routes

constructorMethod(app);

app.use('*', (req, res) => {
  res.status(404).send("Page not found");
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

module.exports = app;
