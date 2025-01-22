const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../data/authorized');
const { getTv } = require('../data/item');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
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

router.use(sanitizeInputs);
router.route('/').get(authorizeUser,async (req, res) => {
    // console.log(req.user);
      if(req.user) {
        try{
          const Tv = await getTv();
          if(Tv.fetched){
        return res
            .status(200)
            .render('pages/cablePage',{
            partial: "cable-script",
            css: "cable-css",
            title:"Cable",
            user:true,
            data:Tv
          });
        }
      }
      catch(e){
        if(e.statusCode===500){
          return res
          .status(500)
          .render('pages/cablePage',{
          partial: "cable-script",
          css: "cable-css",
          title:"Cable",
          user:true,
          hasErrors: true, error: e.message, 
        });
        }
        if(e.statusCode) {
          return res
          .status(400)
          .render('pages/cablePage',{
          partial: "cable-script",
          css: "cable-css",
          title:"Cable",
          user:true,
          hasErrors: true, error: e.message,
        });
         
        } else {
          return res
          .status(400)
          .render('pages/cablePage',{
          partial: "cable-script",
          css: "cable-css",
          title:"Cable",
          user:true,
          hasErrors: true, error: e.message,
        });
        }
      }
    } else {     
      try{
        const Tv = await getTv();
        if(Tv.fetched){
      return res
          .status(200)
          .render('pages/cablePage',{
          partial: "cable-script",
          css: "cable-css",
          title:"Cable",
          data:Tv
        });
      }
    }
    catch(e){
      if(e.statusCode===500){
        return res
        .status(500)
        .render('pages/cablePage',{
        partial: "cable-script",
        css: "cable-css",
        title:"Cable",
      
        hasErrors: true, error: e.message, 
      });
      }
      if(e.statusCode) {
        return res
        .status(400)
        .render('pages/cablePage',{
        partial: "cable-script",
        css: "cable-css",
        title:"Cable",

        hasErrors: true, error: e.message,
      });
       
      } else {
        return res
        .status(400)
        .render('pages/cablePage',{
        partial: "cable-script",
        css: "cable-css",
        title:"Cable",
   
        hasErrors: true, error: e.message,
      });
      }
    }
    }
    })



    router.route('/contactus').post(async (req, res) => {
      
        
          const { Name,Phone,Email,Message } = req.body;
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
                from: Email, // Replace with your email
                to: process.env.EmailtoSend, // Recipient's email
                subject: 'Contact Us Form Submission Xstream',
                text: `Please contact ${Name} (${Phone}). Message: ${Message}`, // Plain text body
            };
    
            // Send the email
            await transporter.sendMail(mailOptions);
    
            res.send('Email sent successfully!');
        } catch (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email. Please try again.');
        }
      })
module.exports = router;