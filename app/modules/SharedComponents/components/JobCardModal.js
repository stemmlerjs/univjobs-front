import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { cardModalContainer, cardLeft, cardRight, cardLeftTopContainer, imgContainer,
        cardHeaderContainer, cardHeaderItemMainText, cardHeaderItemAltItemText,
        cardHeaderItemSecondaryText, cardHeaderItemContainer,
        cardLocation, cardBottomContainer, cardSectionOne, cardSectionTwo,
        cardSectionTitle, cardSectionText, cardActionButtons, cardSectionThree,
        questionsContainer, answerTextField } from '../styles/JobCardModal.css'

import config from 'config'
import moment from 'moment'


//Accept job object which contains the proptypes.
export default function JobCardModal({ 
    title, questions, job, industries, 
    updateAnswerText,
    closeJobAppModal,
    openConfirmApplyModal,
    handlePinJob
  }) { 
  return (
    <div className={cardModalContainer}>

            <div className={cardLeft}>
              <div className={cardLeftTopContainer}>
                <div className={imgContainer}>
                    <img src={config.mediaUrl + job.logo_url}></img>
                </div>
                <div className={cardHeaderContainer}>
                  <div className={cardHeaderItemMainText}>{job.title}</div>
                  <div className={cardHeaderItemSecondaryText}>{industries[job.industry]}</div> 
                  <div className={cardHeaderItemAltItemText}>{job.company_name}</div>
                </div>
              </div>

              <div className={cardBottomContainer}>
                <div className={cardSectionOne}>
                    <div className={cardSectionTitle}>Description</div>
                    <div className={cardSectionText}>{job.description}</div>
                </div>
                <div className={cardSectionTwo}>
                    <div className={cardSectionTitle}>Responsibilities</div>
                    <div className={cardSectionText}>{job.responsibilities}</div>
                </div>
                <div className={cardSectionTwo}>
                    <div className={cardSectionTitle}>Qualifications</div>
                    <div className={cardSectionText}>{job.qualification}</div>
                </div>

              </div>


            </div>
            <div className={cardRight}>

            <div className={cardHeaderItemContainer}>
              <img data-tip="Job location" src={`${config.assetUrl}components/cards/student/actions/a/has_car_active_24px.svg`}/>
              <div className={cardLocation}>{job.office_address + ", " + job.office_city}</div>
            </div>

            {
             /* 
              * ========= Questions ==========
              *
              * If there are even questions that need to be shown, we will display them.
              * We need to first check for the selectedJob attribute to exist (it only)
              * exists when we actually select a job.
              *
              */
            }

            { questions.length != 0 
                ? <div className={questionsContainer}>
                    {
                      /* 
                      * In this case, THERE ARE questions that need
                      * to be answered. We iterate over each one and 
                      * render the HTML for each question and it's answer.
                      */
                    }

                    { questions.map((question, index) => (
                      <div key={question.question_id}>
                        <div><b>{"Question " + (index + 1) + ": "}</b>{question.text}</div>
                        <textarea className={answerTextField} onChange={(e) => {

                          /* 
                          * Update the answers on change.
                          *
                          * To do this, the following block of code figures out
                          * which answer (1 or 2) is being answered and triggers
                          * the update accordingly.
                          */
                          var _this = this;
                          var q = questions;
                          for (var i = 0; i < q.length; i++) {
                            if (q[i].question_id == question.question_id) {
                               updateAnswerText(i + 1, e.target.value)
                            }
                          }

                        }} rows="1" cols="50"></textarea>
                      </div>
                    ))}
                    
                  </div>
                : ''
              }
            

              {
               /* 
                * ========= Buttons ==========
                *
                * Apply to job or close the modal.
                *
                */
              }
              <div>
                <div className={cardActionButtons}>
                  <button onClick={(e) => handlePinJob(e, job)} >
                    { job.pinned == 0 ? 'PIN JOB' : 'UNPIN JOB'}
                  </button>
                  <button onClick={openConfirmApplyModal}>APPLY</button>
                </div>
              </div>
            </div>

            

            
              
    
    </div>
  )
}

