
// NPM LIFECYCLE STATE: 'npm run prodserver'

var express = require('express')
var path = require('path')
var morgan = require('morgan')
var meta = require('./meta')
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


  /*
   * REACT APP WILDCARD ROUTE
   *
   * This rule is a wildcard so that each request that asks for the
   * bundle, no matter what relative url- returns the bundle.
   *
   * This happens when we ask for https://univjobs.ca/posting/:jobId because
   * the index.html asks for "/index_bundle.js" which gets resolved to the absolute
   * url of: "https://univjobs.ca/posting/index_bundle.js" which does not exist.
   *
   * Therefore, this route is a necessary wildcard route that always serves the
   * index_bundle.js if it is asked for- regardless of path.
   */

  app.get('/*index_bundle.js', function (req, res) {
    console.log(`[Route]: Serving index_bundle.js to absolute route: ${req.url}`)
    res.sendFile(path.join(__dirname + '/dist/index_bundle.js'))
  })

  /*
   * HTML TEMPLATE WILDCARD ROUTE
   *
   * If we make a request to anywhere in our app. It should always return
   * the index.html so that client side routing can occur.
   */

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
      res.render('index.html', {
        title: meta.standard.title,
        url: meta.standard.url,
        description: meta.standard.description,
        image: meta.standard.image,
        type: meta.standard.type
      })

      res.sendFile(path.join(__dirname + '/dist/index.html'))
    }
  })
