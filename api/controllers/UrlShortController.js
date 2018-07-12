/**
 * UrlShortController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var emptyValidation = require('../../validations/EmptyValidator.js');
var urlValidation = require('../../validations/UrlValidator.js');

module.exports = {
  validateUrls: function(array){
  	var result =  !array.some(function(element){ 
  		var validation = emptyValidation.isValid(element) && urlValidation.isValid(element);
  		return !validation;
  	});
  	return result;
  },
  bulk: function(req, res){
  	//Validate if the body is not empty
  	if(!emptyValidation.isValid(req.body)){
  		return res.json({message: "Json is required for this endpoint"});
  	}
  	//validate that the body is an array
  	if(!Array.isArray(req.body)){
  		return res.json({message: "Json should be an array"});
  	}
  	//Validate that each element has the url format
  	if(!module.exports.validateUrls(req.body)){
  		return res.json({message: "Some element in the array is empty or not have the url format"});
  	}
  	var urls = [{url:'https://sailsjs.com/docs/concepts/actions'},
  		{url:'wwww.google.com'}];
  	UrlShort.createEach(urls).fetch().then(function(urlsCreated){
	  	return res.json(urlsCreated);
	}).catch(function(err){
		console.log(err);
		return res.json({message: err});
	});
  }

};

