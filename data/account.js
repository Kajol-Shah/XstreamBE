const express = require('express');
const helper = require('../helper');
const {ObjectId} = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const item = mongoCollections.item;
const account = mongoCollections.account;
const locations = mongoCollections.locations;

const getAccount = async (AccountId) => { 
  AccountId= AccountId.trim();
    try{
      helper.validObjectId(AccountId);
    } catch (e) {
        throw e;
    }
  let update = {updated: false};
  let plans = [];
  const itemCollection = await item();
  const usersCollection = await users();
  const accountCollection = await account();
  const locationsCollection = await locations();
  let accounts = await accountCollection.findOne({_id:new ObjectId(AccountId)});
  if(accounts.insertedCount === 0){
    throw {statusCode: 500, message: 'Internal Server Error'};
  }
  let userDetails = await usersCollection.findOne({_id:new ObjectId(accounts.OwnerId)});
  if(userDetails.insertedCount === 0){
    throw {statusCode: 500, message: 'Internal Server Error'};
  }
  else{
    let location = await locationsCollection.findOne({_id:new ObjectId(userDetails.BillingAddress)});
    if(location.insertedCount === 0){
        throw {statusCode: 500, message: 'Internal Server Error'};
      }
    userDetails.location=location.address +', '+ location.street +', '+ location.state;
  }
  if(accounts.PlanPurchased.length!=0)
    {
        for (const item of accounts.PlanPurchased) {
            let isItem = await itemCollection.findOne({_id:new ObjectId(item.item_id)});
            if(isItem.insertedCount === 0){
              throw {statusCode: 500, message: 'Internal Server Error'};
            }
            isItem._id = isItem._id.toString();
            const year = item.start.getFullYear();
            const month = item.start.getMonth() + 1; // JavaScript months are 0-indexed
            const day = item.start.getDate();
            // Add 1 month
            const end = item.start;
            end.setMonth(item.start.getMonth() + 1);

           
            
            const newyear = end.getFullYear();
            const newmonth = end.getMonth() + 1; // JavaScript months are 0-indexed
            const newday = end.getDate();
            isItem.startDate=month+'/'+day+'/'+year;
            isItem.endDate=newmonth+'/'+newday+'/'+newyear;
            plans.push(isItem);
          }
    }
  
    update.userDetails = userDetails;
    if(plans.length!=0){
        update.plans = plans;
    }
    update.updated = true;
    return update;



};

module.exports = {
    getAccount
};