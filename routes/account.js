const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../data/authorized');
const { getAccount,endService } = require('../data/account');
const helper = require('../helper');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
//adding santizatation for inputs
const sanitizeHtml = require('sanitize-html');
dotenv.config({
    path:'./.env'
})
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

    router.route('/end-service').post(authorizeUser,async (req, res) => {
      if(req.user) {
        try 
        {
        
        let requestData = req.user.AccountId;
        let data = req.body.data_id;
        helper.validObjectId(data);
          helper.validObjectId(requestData);
          const details = await endService(requestData,data);
          if(details.ended){
              // console.log(details);
                      
                        try {
                          // Create a transporter
                          const transporter = nodemailer.createTransport({
                              service: 'gmail', // or 'hotmail', 'yahoo', etc.
                              auth: {
                                  user: process.env.Email, // Replace with your email
                                  pass: process.env.app_password, // Replace with your email password or app password
                              },
                          });
                  
                          // Mail options
                          const mailOptions = {
                              from: process.env.Email, // Replace with your email
                              to: process.env.EmailtoSend, // Recipient's email
                              subject: 'End Service Request Xstream',
                              text: `Please update service for ${req.user.FirstName} ${req.user.LastName} with Account ID: ${req.user.AccountId}  
                              Service Details: 
                              Name - ${req.body.ServiceName}
                              ID : ${req.body.data_id}
                              End Date: ${req.body.endDate}`, // Plain text body
                          };
                  
                          // Send the email
                          await transporter.sendMail(mailOptions);
                  
                          return res.status(200).send("Service Ended Successfully!")
                      } catch (error) {
                          console.log('Error sending email:', error);
                          res.status(500).send('Error ! contact Xstream.');
                      }
                      
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
      .status(400).send({hasErrors: true, error: "Cannot end the service"});
    }
    })
module.exports = router;