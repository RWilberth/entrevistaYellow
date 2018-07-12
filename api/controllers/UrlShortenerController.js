/**
 * UrlShortenerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  test: function(req, res){
  	return res.json({
  		url:"https://sailsjs.com/docs/concepts/actions",
  		hash: "#wiwqnjiwq"
  	});
  }

};

