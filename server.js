
// NPM LIFECYCLE STATE: 'npm run prodserver'

var express = require('express')
var path = require('path')

app = express();
app.listen(80, function() {
  console.log("[Node] Front-end server running on port 80")
})

app.use(express.static('dist'))  

app.get('*', function(req, res) {
  console.log
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})