const express = require('express');
const helper = require('../helper');
const {ObjectId} = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const cart = mongoCollections.cart;
const account = mongoCollections.account;
const item = mongoCollections.item;


const getItems = async ( data) => { 
  data= data.trim();
//   console.log(stateNameToAbbreviation(data.State));
  try{
    helper.validObjectId(data);
  } catch (e) {
      throw e;
  }
  let order = {found: false}
  const cartCollection = await cart();
  const itemCollection = await item();
  let total = 0;
  const isItem = await cartCollection.find({AccountId: data, purchased:false}).toArray();
  if(isItem.length===0){
    throw {statusCode: 400, message: 'Cart is empty!'};
  }
  for (const item of isItem) {
    let name = await itemCollection.findOne({_id: new ObjectId(item.itemId)});
    item.subtotal = parseFloat(name.Price);
    item.name = name.Name;
    total = total + parseFloat(name.Price);
    order.total = total.toFixed(2);
  }
//   console.log(isItem.Price);
    
    order.tax = (parseFloat(10/100) * parseFloat(order.total)).toFixed(2);
    order.grandTotal = (parseFloat(total)).toFixed(2);
    order.found = true;
    order.data = isItem;
    return order;



};

const updateItems = async ( data,AccountId) => { 
  AccountId= AccountId.trim();
    try{
      helper.validObjectId(AccountId);
    } catch (e) {
        throw e;
    }
  let update = {updated: false}
  const cartCollection = await cart();
  const accountCollection = await account();
  for (const item of data) {
    let cartUpdate = await cartCollection.updateOne({itemId: (item.itemId),AccountId:AccountId,purchased:false},{ $set: { purchased: true} });
    if(cartUpdate.insertedCount === 0){
      throw {statusCode: 500, message: 'Internal Server Error'};
    }
    let accountUpdate = await accountCollection.updateOne({_id:new ObjectId(AccountId)},{ $push: { PlanPurchased: {item_id:item.itemId,start:new Date()} } });
    if(accountUpdate.insertedCount === 0){
      throw {statusCode: 500, message: 'Internal Server Error'};
    }
  }

    update.updated = true;
    return update;



};
const validation = async ( data,AccountId) => { 
  AccountId= AccountId.trim();
    try{
      helper.validObjectId(AccountId);
    } catch (e) {
        throw e;
    }
    // console.log(data);
  let validate = {validated: false}
  const itemCollection = await item();
  const accountCollection = await account();
  let validData = {};
  let Premium =false;
  let Premium_valid = false;
  for (const item of data.data) {
    let isItem = await itemCollection.findOne({_id: new ObjectId(item.itemId)});
    if(isItem.insertedCount === 0){
      throw {statusCode: 500, message: 'Internal Server Error'};
    }
    else{
      if(isItem.Name==="XSTREAM OP Basic" || isItem.Name==="XSTREAM Choice"){
        validData.basic=true;
      }
      else if(isItem.Name==="25MB"|| isItem.Name==="50MB" || isItem.Name==="100MB"){
        validData.basicInternet=true;
      }
      else if(isItem.Name==="XSTREAM Sports"|| isItem.Name==="XSTREAM HBO" || isItem.Name==="XSTREAM Expanded" || isItem.Name==="XSTREAM Spanish"){
        Premium=true;
      }
      
      else if(isItem.Name==="XSTREAM Preferred"){
        Premium_valid=true;
        validData.basic=true;
        
      }
    }
  }
    let accountItem = await accountCollection.findOne({_id:new ObjectId(AccountId)});
    if(accountItem.insertedCount === 0){
      throw {statusCode: 500, message: 'Internal Server Error'};
    }
    else{
        for (const item of accountItem.PlanPurchased) {
            let isItem = await itemCollection.findOne({_id: new ObjectId(item.item_id)});
            if(isItem.insertedCount === 0){
              throw {statusCode: 500, message: 'Internal Server Error'};
            }
            if(isItem.Name==="XSTREAM OP Basic" || isItem.Name==="XSTREAM Choice"){
              validData.basic=true;
            }
            else if(isItem.Name==="25MB"|| isItem.Name==="50MB" || isItem.Name==="100MB"){
              validData.basicInternet=true;
            }
            else if(isItem.Name==="XSTREAM Preferred"){
              Premium_valid=true;
              validData.basic=true;
            }
          }
    }

    if(validData){
      if(Object.keys(validData).length===2){
        if(validData.basic===true && validData.basicInternet===true){
          
          validate.validated = true;
        }
      }
      else{
        throw {statusCode: 400, message: 'Select all minimum plans(Anyone plan with minimum internet plan)'};
      }
    }
    if(Premium){
      if(Premium_valid){
        validate.validated = true;
      }
      else{
        throw {statusCode: 400, message: 'Select Preferred plan to add Add-on packages'};
      }
    }
    return validate;



};
module.exports = {
    getItems,
    updateItems,
    validation
};