const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../data/authorized');
const { getAccount } = require('../data/account');
const helper = require('../helper');
const sanitizeHtml = require('sanitize-html');

//adding santizatation for inputs
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

// Middleware to sanitize all input fields
router.use(sanitizeInputs);

router.route('/').get(authorizeUser,async (req, res) => {
    // console.log(req.user);
      if(req.user) {
        try 
      {
      
      let requestData = req.user.AccountId;
      // console.log(requestData);
        helper.validObjectId(requestData);
        const details = await getAccount(requestData);
        if(details.updated){
            // console.log(details);
            return res
            .status(200)
            .render('pages/accountPage',{
            partial: "account-script",
            css: "account-css",
            title:"Account",
            user:true,
            data:details,
          });
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
        .status(200)
        .render('pages/registerPage',{
        partial: "register-script",
        css: "register-css",
        title:"Register",
      });
    }
    })
module.exports = router;