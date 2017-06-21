
 /*
  * app/config/index.js
  *
  * When running in prod, change line 9 to 'prod'.
  * When running in dev, change line 9 to 'dev'.
  */

const config = {
  CURRENT_ENV: 'dev',
  dev: {
    baseUrl: 'http://localhost:8080/api/',
    mediaUrl: 'http://localhost:8000/',
    assetUrl: 'https://s3.amazonaws.com/assets.univjobs/'
  },
  prod: {
    baseUrl: 'http://159.203.10.200:8000/api/',
    mediaUrl: 'http://159.203.10.200:8000/',
    assetUrl: 'https://s3.amazonaws.com/assets.univjobs/'
  }
}

module.exports = config.CURRENT_ENV === 'dev' ? config.dev : config.prod;
