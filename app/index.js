import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { initializeBodyStyles } from 'helpers/styles'

initializeBodyStyles();

ReactDOM.render(
  getRoutes(),
  document.getElementById('app')
)