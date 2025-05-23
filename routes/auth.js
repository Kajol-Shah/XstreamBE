//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const helper = require('../helper');
const { createUser,checkUser,updateUser } = require('../data/auth');
const { authorizeUser } = require('../data/authorized');
const sanitizeHtml = require('sanitize-html');

// Middleware to sanitize all input fields
const sanitizeInputs = (req, res, next) => {
    const sanitizeObject = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = sanitizeHtml(obj[key], {
                    allowedTags: [], // No HTML tags allowed
                    allowedAttributes: {},
                });
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitizeObject(obj[key]); // Recursively sanitize nested objects
            }
        }
    };

    sanitizeObject(req.body); // Sanitize request body
    sanitizeObject(req.query); // Sanitize query parameters
    sanitizeObject(req.params); // Sanitize route parameters

    next();
};

router.use(sanitizeInputs);

router.route('/').get(authorizeUser,async (req, res) => {
  // console.log(req.user);
    if(req.user) {
      return res
          .status(200)
          .render('pages/homePage',{
          partial: "home-script",
          css: "home-css",
          title:"Home All",
          user:true,
        });
  } else {     
    return res
    .status(200)
    .render('pages/homePage',{
    partial: "home-script",
    css: "home-css",
    title:"Home All",
  });
  }
  })

  router.route('/profileEdit').post(authorizeUser,async (req, res) => {
      if(req.user) {
        try 
        {
        
        let requestData = req.user.id;
        let data = req.body;
        helper.validationProfile(data);
          helper.validObjectId(requestData);
          const details = await updateUser(requestData,data);
          if(details.updated){
              // console.log(details);
              return res.status(200).send("Profile Updated Successfully!")
          }
          }
          catch(e) {
            if(e.statusCode===500){
              return res
              .status(500).send({hasErrors: true, error: e.message});
            }
            if(e.statusCode) {
              return res
              .status(400).send({hasErrors: true, error: e.message});
            } else {
              return res
              .status(400).send({hasErrors: true, error: e.message});
            }
          }
        
    } else {     
      return res
      .status(400).send({hasErrors: true, error: "Cannot update profile"});
    }
    })
  

  router.route('/register').post(async (req, res) => {
    let requestData = req.body;
    // console.log(requestData);
    requestData.BillingAddress = requestData.Street;
    
    try {
      helper.validationFunction(requestData);
 
      const usersList = await createUser(requestData);
  
      // Check if the user was successfully created
      if (usersList.insertedUser) {
        // console.log(req.user);
        return res
            .status(200)
            .redirect('/service');
      } else {
        return res
          .status(400)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Register",
          hasErrors: true, error: "Resgitration failed.",
        });
      }
    } catch(e) {
        if(e.statusCode===500){
          return res
          .status(500)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Register",
          hasErrors: true, error: e.message, 
        });
        }
        if(e.statusCode) {
          return res
          .status(400)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Register",
          hasErrors: true, error: e.message,
        });
         
        } else {
          return res
          .status(400)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Register",
          hasErrors: true, error: e.message,
        });
        }
      }
    })
   
router.route('/login').post(async (req, res) => { 
  let requestData = req.body;
    
    try {
      helper.validationLogin(requestData);
   
      const user = await checkUser(requestData);
  
      // Check if the user was successfully created
      if (user.authenticatedUser) {
        // console.log(req.user);
        res.cookie("userSave",user.accessToken,user.cookieOptions);
        if(res.cookie){
          return res
          .status(200)
          .redirect('/service');
        }
        
      } else {
        return res
          .status(500)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Sign In",
          hasErrors: true, error: "Sign In Failed", 
        });
      }
    } catch(e) {
        if(e.statusCode===500){
          return res
          .status(500)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Sign In",
          hasErrors: true, error: e.message, 
        });
        }
        if(e.statusCode) {
          return res
          .status(400)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Sign In",
          hasErrors: true, error: e.message, 
        });
        } else {
          return res
          .status(400)
          .render('pages/registerPage',{
          partial: "register-script",
          css: "register-css",
          title:"Sign In",
          hasErrors: true, error: e.message, 
        });
        }
      }
})



router
  .route('/logout').get(authorizeUser,async (req, res) => {
    if (!req.user) {
      return res.status(403).redirect('/register');
  } else {
      res.clearCookie('userSave');
      res.status(200).redirect('/register');
  }   
  
})
module.exports = router;