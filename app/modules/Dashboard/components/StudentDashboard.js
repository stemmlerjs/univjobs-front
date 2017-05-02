
/*StudentDashboard
 *
 * This component is to display numerous job cards for each employer,
 * where students can start applying to jobs employers listed.
 *
 * */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { StudentCard } from 'modules/Dashboard'
import { JobCard, JobCardModal } from 'modules/Dashboard'
import { GenericCard, DASHBOARD_CARD_TYPE, Title } from 'modules/SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactTooltip from 'react-tooltip'

// ================CSS IMPORTS============================== //
import { rootComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//**NOTE:
//  Store is accessible
export default function StudentDashboard ({jobs, handleCardClick, 
	onHideModal, onApplyClicked, onPinJob,
	modal, jobTypes, industries,
	answerOne, answerTwo, updateAnswerField, 
    pin
}) {
        return (
            <div className={rootComponentContainer}>
	            <div className={margins}>

                {/* TITLE */}
                <Title 
                    titleName="Let's get you hired"
                    subHeading="Apply to a job now, so we can help you land one!"
                />

  	            {/*MAIN (Cards List)
  	                NOTE: Reference for iterating using map
  	                https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
                */}

  	            <div className={pageMainJobCards}>
  	                { jobs.length > 0 ? jobs.map((job) => (
                        <div key={job.id}>
  		                    <GenericCard
                                handleCardClick={handleCardClick}
                                cardType={DASHBOARD_CARD_TYPE}
                                job={job}
                                jobTypes={jobTypes}
                                industries={industries}>
		                        <div className={buttonContainers}>
                                    <button 
                                        className={pinIcon} 
			                            onClick={(e) => onPinJob(e, job)} 
			                            data-tip={job.pinned ? "Unpin job?" : "Pin job?" }
                                    >
			                            <i 
			                                className={job.pinned ? rotateIcon + " fa fa-thumb-tack fa-lg " + fillIcon : rotateIcon + " fa fa-thumb-tack fa-lg"} 
			    	                        aria-hidden="true" 
			                            />
			                            <ReactTooltip place="top" type="dark" effect="float"/>
			                        </button>
      			                    <button className={applyButton} onClick={(e) => handleCardClick(e, job)}>
      			                        APPLY
      			                    </button>
			                    </div>
  		                    </GenericCard>
  	                    </div>
  	                )) : '' }
                </div>
  	            // <div className={overflowFix}></div>
  	            // <div className={overflowFix}></div>
  	            // <div className={overflowFix}></div>
  	            // <div className={overflowFix}></div>
            </div>

            {/*MODAL
                The state of modal is checked first,
                if it isOpen === true then show the modal
                else, return empty
            */}

            { modal.isOpen
                ? <ReactCSSTransitionGroup 
                    transitionName="cardModal"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionLeaveTimeout={500}>
                        
                        <SkyLightStateless
                            isVisible={modal.isOpen}
                            onCloseClicked={(e) => onHideModal(e, modal.job.id)}
                            title=""
                        >

                            <JobCardModal 
                                job={modal.job}
                                questions={modal.questions}
                                onApplyClicked={onApplyClicked}
                                industries={industries}
                                answerOne={answerOne}
                                answerTwo={answerTwo}
                                updateAnswerField={updateAnswerField}
                            />
                        </SkyLightStateless>
                    </ReactCSSTransitionGroup>
                :  ""
            }
	    </div>
   )
}

StudentDashboard.propTypes = {
	onHandleClicked: PropTypes.func
}



