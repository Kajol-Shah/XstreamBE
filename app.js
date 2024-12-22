const express = require('express');

const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');
const configRoutes = require('./routes/index');


const app = express();
app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});
// const static = express.static(__dirname + "/public");

// const Handlebars = require('handlebars');

// const handlebarsInstance = exphbs.create({
//   defaultLayout: 'main',
//   // Specify helpers which are only registered on this instance.
//   helpers: {
//     asJSON: (obj, spacing) => {
//       if (typeof spacing === 'number')
//         return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

//       return new Handlebars.SafeString(JSON.stringify(obj));
//     }
//   },
//   partialsDir: ['views/partials/']
// });


// // view engine setup

// app.engine("handlebars", handlebarsInstance.engine);
// app.set("view engine", "handlebars");
// app.use(express.json())
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use("/",configRoutes);
// app.use('/public', static);

// // configRoutes(app);
// app.listen(3000,()=>

//   console.log('Server started on port:3000')
// )


module.exports = app;







