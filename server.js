// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function timeStamp(date){
  var a = new Date("Thu, 1 Jan 1970 00:00:00 GMT");
  var b = new Date(date);
  return b-a;
}

app.get('/api/timestamp/:date_string?',function(req,res,next){
  if(req.params.date_string==null){
    req.time = new Date().toUTCString();
  }
  else{
    req.time = new Date(req.params.date_string).toUTCString();
  }
  next();
},function(req,res){
  var test = ""+req.params.date_string+"";
  if(test.match(/\d/g)){
    if(test.match(/-/)){
      res.send({"unix":timeStamp(req.time),"utc":req.time});
    }
    else{
      res.send({"unix":Number(req.params.date_string),"utc":new Date(Number(req.params.date_string)).toUTCString()});
    }
  }
  else{
    res.send({"unix":timeStamp(req.time),"utc":req.time});
  }
})
