
// NPM LIFECYCLE STATE: 'npm run prodserver'

var express = require('express')
var path = require('path')
var morgan = require('morgan')
var serverPort = 8080

app = express();
app.listen(serverPort, function() {
  console.log(`[Node] Front-end server running on port ${serverPort}`)
})

app.use(express.static('dist'))
app.use('/assets', express.static('dist'))
app.use(morgan('dev'));

/*
 * ====================================================
 * Set templating to render dynamic meta and title tags
 * for some routes.
 *
 * ====================================================
 * ================= EJS TEMPLATING ===================
 * ====================================================
 */

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname + '/dist'));


  app.get('*', function(req, res) {

    const requestUrl = req.url

    /*
     * Public Postings Page
     *
     * For the Public Postings, we need to dynamically render HTML tags.
     */

    if (requestUrl.indexOf("posting") !== -1) {
      console.log("we should dynamically render")

     /*
      *  <meta property="og:title" content="<%= title %>"/>
      *
      *  res.render('index.html', { title: 'The index page!' })
      */

      res.sendFile(path.join(__dirname + '/dist/index.html'))
    }

    /*
     * Otherwise, we're loading a regular route.
     */

    else {
      res.sendFile(path.join(__dirname + '/dist/index.html'))
    }
  })
