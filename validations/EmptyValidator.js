var isEmpty = require('is-empty')

module.exports = {
	isValid: function(value){
		//init trim if not exist
		if (!String.prototype.trim) {
		  console.log(1);
		  (function() {
		    // Make sure we trim BOM and NBSP
		    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		    String.prototype.trim = function() {
		      return this.replace(rtrim, '');
		    };
		  })();
		}
		//if value is type string then trim the string
		if(typeof(value) == typeof(String)){
			value = value.trim();
		}
		return !isEmpty(value);
	}

}