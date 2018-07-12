/**
 * UrlShortController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  bulk: function(req, res){
  	var urls = [{url:'https://sailsjs.com/docs/concepts/actions', hash: 'wqjeijqw'},
  		{url:'wwww.google.com', hash: 'wqjeijqw'}];
  	console.log(req.body);
	UrlShort.createEach(urls).fetch().then(function(urlsCreated){
	  	return res.json(urlsCreated);
	}).catch(function(err){
		console.log(err);
		return res.json({message: err});
	});
  }

};

