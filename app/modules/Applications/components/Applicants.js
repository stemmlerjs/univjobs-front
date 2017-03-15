import React, { PropTypes } from 'react'
import { SkyLightStateless } from 'react-skylight'
import { NavTab } from 'modules/Applications'
import { GenericCard, ApplicationModal, APPLICATIONS_CARD_TYPE, StudentCard } from '../../SharedComponents'
import { rootComponentContainer, margin, pageHeaderSection,
  pageTitle, title, crossHair } from 'sharedStyles/styles.css'
import { pageMainJobCards } from '../styles/index.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default function Applicants ({}) {
  return (
  <div className={rootComponentContainer}>
    <div className={margin}>

    {/* TITLE */}
     <div className={pageHeaderSection}>
        <div className={pageTitle}>
            <h1 className={title}>MY APPLICANTS</h1>
        </div>
        <NavTab/>
     </div>

     {/*MAIN (Cards List)
       NOTE: Reference for iterating using map
            https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
     */}

      <div className={pageMainJobCards}>
          <StudentCard/>
      </div>

      </div>
    </div>
   )
}

