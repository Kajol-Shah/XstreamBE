const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../data/authorized');
const { getTv,getInternet,getPhone} = require('../data/item');
const { getCart } = require('../data/cart');
router.route('/').get(authorizeUser,async (req, res) => {

      // console.log(req.user);
      if(req.user) {
        return res
            .status(200)
            .render('pages/phonePage',{
            partial: "home-script",
            css: "phone-css",
            title:"Phone",
            user:true,
          });
    } else {     
          return res
          .status(200)
          .render('pages/phonePage',{
            partial: "home-script",
          css: "phone-css",
          title:"Phone",
        });
    }
  // if(req.user) {

  
            
//     try{
//       const Tv = await getTv();
//       const Phone = await getPhone();
//       const Internet = await getInternet();
//       const cartFetched = await getCart(req.user.AccountId);
//       // console.log(Internet);

//       if(Tv.fetched || Phone.fetched || Internet.fetched){
//         if(cartFetched.fetched){
//           cartFetched.data.forEach(element => {
//             for (const key in Tv) {
//               if (typeof Tv[key] === 'object') {
//                 // console.log(Tv[key]);
//                 if (checkMatch(Tv[key], element.itemId)) {
//                   Tv[key].purchased=true;
//                 }
//               }
//             }
//             for (const key in Phone.data) {
//               if (typeof Phone.data[key] === 'object') {
//                 if (checkMatch2(Phone.data[key]._id.toString(), element.itemId)) {
//                   Phone.purchased=true;
//                   Phone.data[key].thispurchased=true;
//                 }
//               }
//             }
//             for (const key in Internet.data) {
//               // console.log(Internet.data[key].purchased);
//               if (typeof Internet.data[key] === 'object') {
//                 if (checkMatch2(Internet.data[key]._id.toString(), element.itemId)) {
//                   Internet.purchased=true;
//                   Internet.data[key].thispurchased=true;
                 
//                 }
//               }
//             }
//           });
//           // console.log(Internet);
//           return res
//           .status(200)
//           .render('pages/phonePage',{
//           partial: "internet-script",
//           css: "phone-css",
//           title:"Phone",
//           user:true,
//           data:Tv,
//           phone:Phone,
//           internet:Internet,
//           // datacart:cartFetched
//         });
//         }
//         else{
//           return res
//           .status(200)
//           .render('pages/phonePage',{
//           partial: "internet-script",
//           css: "phone-css",
//           title:"Phone",
//           user:true,
//           data:Tv,
//           phone:Phone,
//           internet:Internet,
//         });
//         }
            
//       }
//       else{
//         return res
//             .status(200)
//             .render('pages/phonePage',{
//             partial: "internet-script",
//             css: "phone-css",
//             title:"Phone",
//             user:true,
//           });
//       }
//     }
//     catch(e){
//       if(e.statusCode===500){
//         return res
//         .status(500)
//         .render('pages/phonePage',{
//         partial: "internet-script",
//         css: "phone-css",
//         title:"Phone",
//         user:true,
//         hasErrors: true, error: e.message, 
//       });
//       }
//       if(e.statusCode) {
//         return res
//         .status(400)
//         .render('pages/phonePage',{
//         partial: "internet-script",
//         css: "phone-css",
//         title:"Phone",
//         user:true,
//         hasErrors: true, error: e.message,
//       });
       
//       } else {
//         return res
//         .status(400)
//         .render('pages/phonePage',{
//         partial: "internet-script",
//         css: "phone-css",
//         title:"Phone",
//         user:true,
//         hasErrors: true, error: e.message,
//       });
//       }
//     }
    
// } else {     
//   try{
//     const Internet = await getInternet();
//     const Phone = await getPhone();
//     if(Internet && Phone){
//       return res
//         .status(200)
//         .render('pages/phonePage',{
//           partial: "internet-script",
//         css: "phone-css",
//         title:"Phone",
//         internet:Internet,
//         phone:Phone,
//       });
//     }
//   }
//   catch(e){
//     if(e.statusCode===500){
//       return res
//       .status(500)
//       .render('pages/phonePage',{
//       partial: "internet-script",
//       css: "phone-css",
//       title:"Phone",
      
//       hasErrors: true, error: e.message, 
//     });
//     }
//     if(e.statusCode) {
//       return res
//       .status(400)
//       .render('pages/phonePage',{
//       partial: "internet-script",
//       css: "phone-css",
//       title:"Phone",
     
//       hasErrors: true, error: e.message,
//     });
     
//     } else {
//       return res
//       .status(400)
//       .render('pages/phonePage',{
//       partial: "internet-script",
//       css: "phone-css",
//       title:"Phone",
      
//       hasErrors: true, error: e.message,
//     });
//     }
//   }
  
// }


    
    })
module.exports = router;