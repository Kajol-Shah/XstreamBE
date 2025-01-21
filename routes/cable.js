const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../data/authorized');
const { getTv } = require('../data/item');
const nodemailer = require('nodemailer');
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



    router.route('/contactus').post(authorizeUser,async (req, res) => {
      // console.log(req.user);
        if(req.user) {
          const { Name,Phone,Email,Message } = req.body;
          try {
            // Create a transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail', // or 'hotmail', 'yahoo', etc.
                auth: {
                    user: 'your@gmail.com', // Replace with your email
                    pass: 'your-password', // Replace with your email password or app password
                },
            });
    
            // Mail options
            const mailOptions = {
                from: Email, // Replace with your email
                to: "your@gmail.com", // Recipient's email
                subject: 'Form Submission',
                text: "Message from "+ Name+"("+Phone+")" +Message, // Plain text body
            };
    
            // Send the email
            await transporter.sendMail(mailOptions);
    
            res.send('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email. Please try again.');
        }
          
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
      })
module.exports = router;