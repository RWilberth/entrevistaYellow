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
  redirectUrl: function(req, res){
    var params = req.params;
    var hashToken = params.hashToken;
    if(!emptyValidation.isValid(hashToken)){
      return res.json({message: "Token value is required for this endpoint"});
    }
    var hashNumber = hashGenerator.convertBase62ToBase10(params.hashToken);
    console.log(hashNumber);

    UrlShort.find({hash: hashNumber}).then(function(urls){
      console.log(urls);
    });
    UrlShort.findOne({hash: hashNumber}).then(function(urlShort){
      console.log(urlShort);
      if(!urlShort){
        return res.notFound('Could not your url, sorry.');
      }else{
        return res.redirect(urlShort.url);
      }
    }).catch(function(e){
      console.log(e);
      return res.json({message: e});
    })
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
                return res.json({message: err});
            }
            var urls = req.body.map(function(url){
              return {url:url};
            });
          UrlShort.createEach(urls).fetch().then(function(urlsCreated){
            var hashCreated = urlsCreated.map(function(url){
              var numToHash = url.hash.toString();
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

