var express=require("express");
var cfenv = require("cfenv");
var Cloudant = require("cloudant");

var vcapLocal; 

// load local VCAP configuration  and service credentials
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}
const appEnv = cfenv.getAppEnv(appEnvOpts);
console.log("AppEnv", appEnv);

// Get Cloudant Credentials
if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) { 
  	// Initialize database with credentials
  	if (appEnv.services['cloudantNoSQLDB']) {
    	// CF service named 'cloudantNoSQLDB'
     	var cloudant_token = appEnv.services['cloudantNoSQLDB'][0].credentials;
	} else {
     	// user-provided service with 'cloudant' in its name
     	var cloudant_token = appEnv.getService(/cloudant/).credentials;
  	}
}

// Cloudant DB setup
var dbName = 'mydb';
var cloudant = Cloudant(cloudant_token);
// Create a new "mydb" database.
cloudant.db.create(dbName, function(err, data) {
	if(!err) //err if database doesn't already exists
      	console.log("Created database: " + dbName);
});

// Specify the database we are going to use (mydb)...
mydb = cloudant.db.use(dbName);