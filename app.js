const express = require('express');
const configRoutes = require('./routes/index');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const app = express();
const static = express.static(__dirname + '/public');

// Create a Handlebars instance with helpers and partials directory
const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number') {
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
      }
      return new Handlebars.SafeString(JSON.stringify(obj));
    },
  },
  partialsDir: ['views/partials/'], // Specify the partials directory
});

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/public', static);

// View engine setup
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

// Configure routes

// configRoutes(app);
app.use('/', './routes/index');
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
