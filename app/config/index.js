const config = {
  CURRENT_ENV: 'dev',
  dev: {
    baseUrl: 'http://localhost:3000/api/'
  },
  prod: {
    baseUrl: 'http://eoymxx-univjobs-back-staging-univjobs.runnableapp.com/api/'
  }
}

module.exports = config.CURRENT_ENV === 'dev' ? config.dev : config.prod;