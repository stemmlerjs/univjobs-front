import React, { PropTypes } from 'react'
import { SkyLightStateless } from 'react-skylight'
import { GenericCard, ApplicationModal, APPLICATIONS_CARD_TYPE } from '../../SharedComponents'
import { rootComponentContainer, margin, pageHeaderSection,
  pageTitle, title, crossHair } from 'sharedStyles/styles.css'
import { arrowButton, pageMainJobCards } from '../styles/index.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default function NavTab ({}) {
  return (

     <div>
          <nav>
            <button className={arrowButton}>Job1</button>
            <button className={arrowButton}>Job2</button>
            <button className={arrowButton}>Job3</button>
          </nav>
     </div>
   )
}

