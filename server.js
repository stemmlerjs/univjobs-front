
// NPM LIFECYCLE STATE: 'npm run prodserver'

var express = require('express')
var path = require('path')
var morgan = require('morgan')
var meta = require('./meta')
var axios = require('axios')
var serverPort = 8080

app = express();
app.listen(serverPort, function() {
  console.log(`[Node] Front-end server running on port ${serverPort}`)
})

// app.use(express.static('dist'))
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


  function getJobIdFromPublicPageRequest(requestUrl) {
    const matchesArr = requestUrl.match(/(\/[0-9]*)+\d(?!p)/g);

    if (matchesArr.length !== 0) {
      return matchesArr[0].split("/").join("")
    }

    else {
      return null
    }
  }

  function renderStandardMetaTags (req) {
    res.render('index.html', {
      title: meta.standard['og:title'],
      url: meta.standard['og:url'],
      description: meta.standard['og:description'],
      image: meta.standard['og:image'],
      type: meta.standard['og:type']
    })
  }

  app.get('*', function(req, res) {

    const requestUrl = req.url

    console.log(requestUrl)

    /*
     * Public Postings Page
     *
     * For the Public Postings, we need to dynamically render HTML tags.
     */

    if (requestUrl.indexOf("posting") !== -1) {
      console.log("we should dynamically render")

      var jobId = getJobIdFromPublicPageRequest(requestUrl)
      console.log("Extracted Job id = ", jobId)

      /*
       * If we can't extract the job id for this job posting, 
       * then we'll just go ahead and return the regular meta
       * tags for the website.
       */

      if (jobId === null) {

        renderStandardMetaTags(req)
      }

      /*
       * If we've got the jobId, then we need to get the details
       * from the API for this job.
       */

      else {  

        axios(`http://localhost:8000/api/public/job/${jobId}`)
          .then((response) => {

            var job = response.data.job;

            var title = job.title;
            var url = 'https://univjobs.ca' + requestUrl
            var description = job.description
            var image = "https://api.univjobs.ca/" + job.logo_url;
            debugger;

            res.render('index.html', {
              title: title,
              url: url,
              description: description,
              image: image,
              type: meta.standard['og:type']
            })

          })
          .catch((err) => {

            console.log("Error trying to request job info.")
            
            renderStandardMetaTags(req)

          })

      }

      
    }

    /*
     * Otherwise, we're loading a regular route.
     */

    else {
      console.log("basic render")

      renderStandardMetaTags(req)

      // res.sendFile(path.join(__dirname + '/dist/index.html'))
    }
  })
