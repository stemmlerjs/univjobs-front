const config = {
  CURRENT_ENV: 'dev',
  dev: {
    baseUrl: 'http://localhost:8080/api/',
    mediaUrl: 'http://localhost:8000/',
    assetUrl: 'https://s3.amazonaws.com/assets.univjobs/'
  },
  prod: {
    baseUrl: 'http://eoymxx-univjobs-back-staging-univjobs.runnableapp.com/api/'
  }
}

module.exports = config.CURRENT_ENV === 'dev' ? config.dev : config.prod;
