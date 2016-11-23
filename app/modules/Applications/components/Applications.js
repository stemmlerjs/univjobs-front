import React, { PropTypes } from 'react'
import { SkyLightStateless } from 'react-skylight'
import { GenericCard, ApplicationModal, APPLICATIONS_CARD_TYPE } from '../../SharedComponents'
import { rootComponentContainer, margin, pageHeaderSection,
  pageTitle, title, crossHair } from 'sharedStyles/styles.css'
import { pageMainJobCards } from '../styles/index.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default function Applications ({user, applications, industries, jobTypes, applicationModal, onShowModal, onHideModal}) {
  return (
  <div className={rootComponentContainer}>
    <div className={margin}>

    {/* TITLE */}
     <div className={pageHeaderSection}>
      <div className={pageTitle}>
       <h1 className={title}>MY APPLICATIONS</h1>
      </div>
     </div>

     {/*MAIN (Cards List)
       NOTE: Reference for iterating using map
            https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
     */}

     <div className={pageMainJobCards}>
      { applications ? applications.map((application) => (
          <div className={application ? crossHair : ''}
               key={application.id}>
            <GenericCard
              cardType={APPLICATIONS_CARD_TYPE}
              job={application}
            	jobTypes={jobTypes}
              industries={industries}
              handleCardClick={onShowModal}>
              <button/>
              <button/>
              <button/>
            </GenericCard>
          </div> 
        ))
        : ''
      }
      </div>
     </div>
      { applicationModal.isOpen 
        ? <ReactCSSTransitionGroup 
            transitionName="cardModal"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={true}
            transitionLeaveTimeout={500}>
            <SkyLightStateless
              isVisible={applicationModal.isOpen}
              onCloseClicked={(e) => onHideModal(e, applicationModal.application.id)}
              title="">
              <ApplicationModal application={applicationModal.application}
                industries={industries}
                jobTypes={jobTypes}/>
            </SkyLightStateless>
        </ReactCSSTransitionGroup>
        :  ""
      }
    </div>

   )
}

