var _ = require("underscore");

module.exports = {
	name : "baseController",
	extend : function(child) {
		return _.extend({}, this, child);
	},
	createResponse: function(data,status){
		var ob = {};
		if(data!='')ob.data = data;
		ob.status = status;
		return ob;
	},
	beforeRender : function(req, res, next) {
		console.log('running beforeRender ...\n');
		next();
	}	
}



//used to make the file into json form
