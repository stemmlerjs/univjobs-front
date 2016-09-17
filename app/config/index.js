const config = {
  CURRENT_ENV: 'dev',
  dev: {
    baseUrl: 'http://localhost:8080/api/',
    mediaUrl: 'http://ec2-52-87-227-85.compute-1.amazonaws.com:8000/media/'
  },
  prod: {
    baseUrl: 'http://eoymxx-univjobs-back-staging-univjobs.runnableapp.com/api/'
  }
}

module.exports = config.CURRENT_ENV === 'dev' ? config.dev : config.prod;