const express = require('express');
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require('./routes/index');
const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');
app.use('/public', static);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
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



app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");
app.use(cookieParser());
configRoutes(app);
app.listen(3000,()=>

    console.log('Server started on port:3000')
)
module.exports = app;