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
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");
app.use('/public', static);
app.use("/",configRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send(err.stack);
});
// configRoutes(app);
app.listen(3000,()=>

  console.log('Server started on port:3000')
)


module.exports = app;







