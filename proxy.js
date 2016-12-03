var express = require('express');  
var request = require('request');
var apiServerHost = 'http://ec2-52-87-227-85.compute-1.amazonaws.com:8000/'
/*var apiServerHost = 'localhost:8000/'*/

var app = express();  
app.use('/', function(req, res) {  
  var url = apiServerHost + req.url;
  console.log('req.url', req.url)
  console.log('url', url)
  req.pipe(request(url)).pipe(res);
});

app.listen(3000); 

