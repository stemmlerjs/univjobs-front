/*Applications
 *
 * This components is to display the applications that the students applied to, to a particular job 
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { GenericCard, ApplicationModal, APPLICATIONS_CARD_TYPE, Title } from '../../SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// ================CSS IMPORTS============================== //
import { flexibleCardContainer } from 'sharedStyles/cardContainer.css'
import { rootComponentContainer, margins, title } from 'sharedStyles/sharedComponentStyles.css'
import { crossHair } from 'sharedStyles/widgets.css'


/*TODO: Define the required typechecking variables
 *
 * */
Applications.propTypes = {
	    user: PropTypes.object.isRequired, 
        applications : PropTypes.object,
        industries : PropTypes.object,
        jobTypes : PropTypes.object, 
        applicationModal: PropTypes.object,
      	onShowModal: PropTypes.func,
      	onHideModal: PropTypes.func,
        cardType: PropTypes.string,
        handleCardClick: PropTypes.func
}

export default function Applications ({user, applications, industries, jobTypes, applicationModal, onShowModal, onHideModal}) {
  return (
  <div className={rootComponentContainer}>
    <div className={margins}>

    {/* TITLE */}
    <Title 
      titleName="My applicants"
      subHeading="Click on a student to get more in-depth look at their profile and view their applicantion."
    />

     {/*MAIN (Cards List)
       NOTE: Reference for iterating using map
            https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
     */}

     <div className={flexibleCardContainer}>
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

