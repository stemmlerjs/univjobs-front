
// NPM LIFECYCLE STATE: 'npm run prodserver'

var express = require('express')
var path = require('path')
var morgan = require('morgan')

app = express();
app.listen(8080, function() {
  console.log("[Node] Front-end server running on port 80")
})

app.use(express.static('dist'))
app.use(morgan('dev'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})
