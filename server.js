// server.js
// load the things we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var date = new Date();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
// use res.render to load up an ejs view file

// index page
app.get("/", function(req, res) {
  var result = getResult(function(err, result) {
    //handle err, then you can render your view
    //console.log(result);
    res.render("pages/index", {
      collection: result
    });
  });
});

app.get("/guestbook", function(req, res) {
  var result = getResult(function(err, result) {
    //handle err, then you can render your view
    //  console.log(result);
    res.render("pages/guestbook", {
      collection: result
    });
  });
});

// message page
app.get('/newmessage', function(req, res) {
  res.render('pages/newmessage');
});

app.post('/adduser', function(req, res) {
  //res.render('pages/adduser');
  var result = addData(function(err, result) {
    //handle err, then you can render your view
    //console.log(result);
    res.render("pages/adduser", {
      collection: result, name:name
    });
  });

  //console.log(json);

  var name = req.body.name;

  console.log(name);

  var peruna = {
    "username": req.body.name,
    "id": req.body.id,
    "date": date,
    "country": req.body.country,
    "message": req.body.message
  };


  function addData(callback) {
    const MongoClient = require("mongodb").MongoClient;
    // Connection URL
    const url = "mongodb://123456A:123456A@ds026018.mlab.com:26018/testitietokanta";
    // Database Name
    const dbName = "testitietokanta";



    MongoClient.connect(
      url, {
        useNewUrlParser: true
      },
      function(err, client) {
        if (err) {
          console.log("Unable to connect to the mongoDB server. Error:", err);
        } else {
          console.log("Connection established to", url);

          const db = client.db(dbName);

          var query = {};

          db.collection("Guestbook").insertOne(peruna, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
          });

        }});}

  res.render('pages/adduser', {collection: result});
  //request.end();
});

// guestbook page
app.get('/guestbook', function(req, res) {
  res.render('pages/guestbook');

  var tag = json;


  res.render('pages/guestbook', {
    tag: tag
  });

});

app.get('/admin', function(req, res) {
  var result = getResult(function(err, result) {
    //handle err, then you can render your view
    //console.log(result);
    res.render("pages/admin", {
      collection: result
    });
  });

});

app.get('/edituser', function(req, res) {
  var result = getResult(function(err, result) {
    //handle err, then you can render your view
    //console.log(result);
    res.render("pages/edituser", {
      collection: result
    });
  });

});


app.post('/removeuser', function(req, res) {
  //res.render('pages/adduser');
  var result = deleteData(function(err, result) {
    //handle err, then you can render your view
    //console.log(result);
    res.render("pages/removeuser", {
      collection: result
    });
  });

  //console.log(json);

  var name = req.body.name;


  function deleteData(callback) {
    const MongoClient = require("mongodb").MongoClient;

    // Connection URL
    const url = "mongodb://123456A:123456A@ds026018.mlab.com:26018/testitietokanta";

    // Database Name
    const dbName = "testitietokanta";

    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
      if (err) {
        console.log("Unable to connect to the mongoDB server. Error:", err);
      } else {
        console.log("Connection established to", url);

        const db = client.db(dbName);
        var form = [];

        var query = {};
        var lanttu = req.body.username;

        console.log(lanttu);
        db.collection("Guestbook").removeOne({
          username: lanttu
        }, function(err, res) {
          if (err) throw err;
          console.log("1 document deleted " + name);
        });}});}

  res.render('pages/removeuser', {collection: result});
  //request.end();
});



app.post('/edituseraction', function(req, res) {
  //res.render('pages/adduser');
  var result = editData(function(err, result) {
    //handle err, then you can render your view
    //console.log(result);
    res.render("pages/edituseraction", {collection: result});
  });

  //console.log(json);

  var name = req.body.name;

  function editData(callback) {
    const MongoClient = require("mongodb").MongoClient;

    // Connection URL
    const url = "mongodb://123456A:123456A@ds026018.mlab.com:26018/testitietokanta";

    // Database Name
    const dbName = "testitietokanta";

    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
      if (err) {
        console.log("Unable to connect to the mongoDB server. Error:", err);
      } else {
        console.log("Connection established to", url);

        const db = client.db(dbName);
        var form = [];

        var query = {};
        var nauris = req.body.username;
        var porkkana = req.body.message;
        console.log(porkkana);
                console.log(nauris + " päivitettiin!");
        db.collection("Guestbook").updateOne({username:nauris},{$set : {"message":porkkana}});

      }});}

  res.render('pages/edituseraction', {collection: result});
  //request.end();
});







// guestbook page
app.get('/guestbook', function(req, res) {
  res.render('pages/guestbook');

  var tag = json;


  res.render('pages/guestbook', {
    tag: tag
  });});

app.listen(8080);
console.log('8080 is the magic port');


function getResult(callback) {
  const MongoClient = require("mongodb").MongoClient;
  // Connection URL
  const url = "mongodb://123456A:123456A@ds026018.mlab.com:26018/testitietokanta";
  // Database Name
  const dbName = "testitietokanta";

  MongoClient.connect(url, {useNewUrlParser: true},
    function(err, client) {
      if (err) {
        console.log("Unable to connect to the mongoDB server. Error:", err);
      } else {
        console.log("Connection established to", url);

        const db = client.db(dbName);
        var query = {};
        db.collection("Guestbook").find(query).limit(50).sort({"_id":-1}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();

            callback(err, result);
          });
      }});}
