var express = require('express');
var router = express.Router();
var path = require('path');

var app = express();
//var Cloudant = require('cloudant');
/**
 * Endpoint to greet and add a new visitor to database.
 * Send a POST request to localhost:3000/api/visitors with body
 * {
 * 	"name": "Bob"
 * }
 */

var mydb;


//mydb = cloudant.db.use(dbName);

router.post("/visitors", function (request, response) {
  var userName = request.body.name;
  if(!mydb) {
    console.log("No database.");
    response.send("Hello " + userName + "!");
    return;
  }
  // insert the username as a document
  mydb.insert({ "name" : userName }, function(err, body, header) {
    if (err) {
      return console.log('[mydb.insert] ', err.message);
    }
    response.send("Hello " + userName + "! I added you to the database.");
    //console.log("Hello " + userName + "! I added you to the database.");
  });
});


/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://localhost:3000/api/visitors
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
router.get("/visitors", function (request, response) {
  var names = [];
  if(!mydb) {
    response.json(names);
    return;
  }

  mydb.list({ include_docs: true }, function(err, body) {
    if (!err) {
      body.rows.forEach(function(row) {
        if(row.doc.name)
          names.push(row.doc.name);
      });
      response.json(names);
    }
  });
});

router.get("/update/visitors", function (request, response) {
  if(!mydb) {
    console.log("No databae.");
  }
  mydb.insert({ "_id": "9d6f384ba701870c97ae67dde5f30f31", "_rev":"1-db47e74e76d1d8463f300d5eef1faf79", "name": "tyty"}, function (err, body) {
    if(!err) {
      console.log("Update");
      console.log(body);
    }
  })
})


router.get("/delete/visitors", function (request, response) {
  if(!mydb){
    console.log("Database not exists");
  }

  mydb.destroy("d63b2199472adcac8adab86daf4762a1", "1-db47e74e76d1d8463f300d5eef1faf79", function(err, body) {
    if (!err) {
      console.log("Successfully deleted");
      console.log(body);
    }
  })
})


// router.get("/api/visitors", function (request, response) {
//   var _id;
//   var _rev;

//   mydb.insert({"_id": _id, "_rev": _rev}, function(err, body, header) {
//     if(err) {
//       console.log('[mydb.insert]', err);
//       return;
//     }
//     console.log('success')
//   })
// })

// router.get("/api/visitors", function (request, response) {
//   var docId = items[0]._id;
//   var docRev = items[0]._rev;
//   if(!mydb){
//     console.log("Database not exists");
//   }

//   mydb.destroy(docId, docRev, function(err, body) {
//     if (!err) {
//       console.log("Successfully deleted" + docId);
//     }
//   })
// })

module.exports=router;