const express = require('express');
const {constructorMethod} = require('./routes');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const helmet = require('helmet');

const app = express();
const static = express.static(__dirname + "/public");

app.use(helmet());

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/public', static);
// Set MIME type for CSS
app.use('/node_modules/sweetalert2/dist/sweetalert2.css', express.static(path.join(__dirname, 'node_modules/sweetalert2/dist/sweetalert2.css'), {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', 'text/css');
  }
}));
// Set MIME type for JavaScript
app.use('/node_modules/sweetalert2/dist/sweetalert2.all.min.js', express.static(path.join(__dirname, 'node_modules/sweetalert2/dist/sweetalert2.all.min.js'), {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', 'application/javascript');
  }
}));
app.use((req, res, next) => {
  // Add 'unsafe-inline' to allow inline scripts and attributes
  res.setHeader('Content-Security-Policy', 
    "script-src 'self' 'unsafe-inline' ../../node_modules/sweetalert2/dist/sweetalert2.all.min.js; " +
    "script-src-attr 'self' 'unsafe-inline';");
  next();
});

// Middleware and engine order setup => why is this important?
/* Since helmet does not allow the use of the X-Powered-By header, it is important to set the engine and middleware order correctly. If the engine is set after helmet, the X-Powered-By header will be set by default. If the engine is set before helmet, the X-Powered-By header will not be set. 

After helmet, we should have the parsers and the static middleware. This is because the parsers are used to parse the incoming requests before the engine can render the views. The parsers are used to parse the incoming requests before the static middleware can serve the static files.

the engine should be set after the parsers and the static middleware. This is because the engine is used to render the views after the parsers have parsed the incoming requests and the static middleware has served the static files. 

Using the wildcard route is fine, but I think to set it all to 404 is a bit harsh. I would suggest setting it to a 404 page instead. To follow stanard practice, we should have a 401 and 403 page prior to the final 404 page. If we do, this lessens the harshness wildcard based of the 404 page.
*/


app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main', // Default layout file (e.g., main.handlebars)
  partialsDir: path.join(__dirname, 'views/partials'), // Path to partials
}));
app.set('view engine', 'handlebars');

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

// Configure routes

constructorMethod(app);
app.use(function(err, req, res, next) {
  res.status(err.status || 500); // lets put in a 401 and 403 please
  res.render('error', {
      message: err.message,
      error: {}
  });

app.use('*', (req, res) => {
  res.status(404).send("Page not found");
});

});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

module.exports = app;
