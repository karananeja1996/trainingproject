var config = {
	development : {
		port : 8000,
		mod : 'development',
		mysql : {
			host : 'localhost',
			username : 'root',
			pass : 'source',
			dbname : 'appraisal'
		}		
	},
	staging : {
		port : 4000,
		mode : 'staging',
		mysql : {
				host : 'localhost',
				username : 'root',
				pass : 'source',
				dbname : 'appraisal'
		}
	}
}

//module.exports = config.development;
module.exports = function(mode){
	return config[mode] || config.development;
}
