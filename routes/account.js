const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../data/authorized');
const { getAccount } = require('../data/account');
const helper = require('../helper');
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
        .render('pages/accountPage',{
        partial: "account-script",
        css: "account-css",
        title:"Account",
      });
    }
    })
module.exports = router;