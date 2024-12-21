const express = require('express');

const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');
const configRoutes = require('./routes/index');


const app = express();
const static = express.static(__dirname + "/public");

const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  },
  partialsDir: ['views/partials/']
});


// view engine setup

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use("/",configRoutes);
app.use('/public', static);

configRoutes(app);
app.listen(3000,()=>

  console.log('Server started on port:3000')
)
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   console.log(err);
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;







