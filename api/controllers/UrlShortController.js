/**
 * UrlShortController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var emptyValidation = require('../../validations/EmptyValidator.js');
var urlValidation = require('../../validations/UrlValidator.js');
var hashGenerator = require('../../components/hashGenerator.js');
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
     Counter.findOrCreate({ code: 'UrlShortSequence' }, { code: 'UrlShortSequence', sequence: 0 })
        .exec(function(err, counter, wasCreated){
            if (err) { 
                console.log(err);
                return proceed(); 
            }
            var urls = req.body.map(function(url){
              return {url:url};
            });
          UrlShort.createEach(urls).fetch().then(function(urlsCreated){
            var hashCreated = urlsCreated.map(function(url){
              var numToHash = (url.sec.toString() + url.createdAt.toString());
              var hash = hashGenerator.convertBase10ToBase62(parseInt(numToHash));
              return {hash: hash, url: url.url};
            });
            return res.json(hashCreated);
        }).catch(function(err){
          console.log(err);
          return res.json({message: err});
        });
  	
	 });
  }

};

