/*Applications
 *
 * This components is to display the jobs pinned by the students
 *
 * */
// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
/*NOTE: JobCardModal most likely can be reused*/
import { JobCardModal, GenericCard, PINNED_JOBS_CARD_TYPE, Title } from 'modules/SharedComponents'

// ==============THIRD PARTY IMPORTS========================= //
import { SkyLightStateless } from 'react-skylight'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTooltip from 'react-tooltip'

// ================CSS IMPORTS============================== //
/*NOTE: styles/StudentDashboard.css can be reused */
import { rootComponentContainer, margins, title } from 'sharedStyles/sharedComponentStyles.css'
import { pageMainJobCards } from 'sharedStyles/jobCard.css'
import { pinIcon, fillIcon, unFillIcon, rotateIcon } from 'sharedStyles/pinCards.css'
import { buttonContainers } from 'sharedStyles/widgets.css'
import { overflowFix } from 'sharedStyles/sharedComponentStyles.css'

export default function PinJobs ({handleCardClick, jobs, industries, 
				  jobTypes, onPinJob, modal, onHideModal, onApplyClicked,
				  answerOne, answerTwo, updateAnswerField
}) {
  return (
	<div className={rootComponentContainer}>
	    <div className={margins}>
        
            {/* TITLE */}
            <Title 
                titleName="MY PINNED JOBS"
                subHeading="This is where all the job you pinned are displayed"
            />

            <div className={pageMainJobCards}>
                  {jobs ? jobs.map((job) => (
                              <div key={job.id}>
                                  <GenericCard
                                  handleCardClick={handleCardClick}
                                  cardType={PINNED_JOBS_CARD_TYPE}
                                  job={job}
                                  jobTypes={jobTypes}
                                  industries={industries}
                               >
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
                                        <button className={applyButton}
                                            onClick={(e) => handleCardClick(e, job)}
                                        >
                                            APPLY
                                        </button>
                                   </div>
                               </GenericCard>
                            </div>
                              )) : '' }
            </div>
                    <div className={overflowFix}></div>
                    <div className={overflowFix}></div>
                    <div className={overflowFix}></div>
                    <div className={overflowFix}></div>
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

              {/*
                TODO: 
               - [x] Add updateAnswerField
               - [ ] Make applyButtonWork
               - [ ] Delete the pinned jobs in db
              */}
                    <JobCardModal job={modal.job}
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

PinJobs.propTypes = {
}



