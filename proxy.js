var express = require('express');  
var request = require('request');
var apiServerHost = 'http://www.univjobs.ca'

var app = express();  
app.use('/', function(req, res) {  
  var url = apiServerHost + req.url;
  console.log('req.url', req.url)
  console.log('url', url)
  req.pipe(request(url)).pipe(res);
});

app.listen(3000); 

