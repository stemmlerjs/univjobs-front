import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { cardModalContainer, cardLeft, cardRight, cardLeftTopContainer, imgContainer,
        cardHeaderContainer, cardHeaderItemMainText, cardHeaderItemAltItemText,
        cardHeaderItemSecondaryText, cardHeaderItemContainer,
        cardLocation, cardBottomContainer, cardSectionOne, cardSectionTwo,
        cardSectionTitle, cardSectionText, cardActionButtons, cardSectionThree,
        questionsContainer, answerTextField, answerTextFieldReadOnly, dateApplied,
        statusItem, statusIcon, statusText, statuses, statusHeaderText, notActive,
        notActiveStatusIcon, statusIconReject, statusItemRejected, locationIconNoHover,
        divider1, smallJobTypeTitle,

        cardSectionMain, companyInfo , clock, applicantsContainer, clock_0_50, clock_51_75, 
        clock_76_100, calendar, locationPin, applicationProgress, googleMapsLinkStyle,
        hideDisplay, moneyIcon, lastThing, mobilePadding
     } from '../styles/JobCardModal.css'
import { altImageContainer } from '../styles/JobCard.css'

import ReactTooltip from 'react-tooltip'
import config from 'config'
import moment from 'moment'

const QuestionsSubcomponent = ({ cardType, questions, job, updateAnswerText }) => (
  <div> 
    {
      cardType !== 'createjob'

        ? questions.length != 0 
          ? <div className={questionsContainer}>

              {
                /* 
                * In this case, we're on a regular job page and THERE ARE questions that need
                * to be answered. We iterate over each one and 
                * render the HTML for each question and it's answer.
                */
              }

              { questions.map((question, index) => (
                <div key={question.question_id}>
                  <div><b>{"Question " + (index + 1) + ": "}</b>{question.text}</div>
                  
                  {
                    cardType == "applications"
                      ? <textarea className={answerTextFieldReadOnly} readOnly value={job.answers[index].text}></textarea>
                      : <textarea className={answerTextField} onChange={(e) => {

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
                  }
                </div>
              ))}
              
            </div>
            
          : ''

          : questions.question1 !== '' || questions.question2 !== ''

            ? (<div className={questionsContainer}>

                {
                  questions.question1 !== ''
                    ? <div>
                        <div><b>{"Question " + 1 + ": "}</b>{questions.question1}</div>
                        <textarea className={answerTextField} rows="1" cols="50"></textarea>
                      </div>
                    : ''
                }
                {
                  questions.question2 !== ''
                    ? <div>
                        <div><b>{"Question " + 2 + ": "}</b>{questions.question2}</div>
                        <textarea className={answerTextField} rows="1" cols="50"></textarea>
                      </div>
                    : ''
                }
                
              </div>)
            : ''
    }
  </div>
)

const SupplementalJobItemsInfo = ({ job, mapsLink, page }) => (
  <div className={window.isMobile ? mobilePadding : ''}>
    <div className={cardHeaderItemContainer}>
      <i className={`fa fa-calendar ${calendar}`}></i>
      <div className={cardLocation}>{'Starts ' + moment(new Date(job.start_date)).format('MMMM Do, YYYY')}</div>

      { /*
        cardType == "applications" 
          ? <div className={dateApplied}>Applied {moment(job.date_applied).format('MMMM Do, YYYY') + ' at ' + moment(job.date_applied).format('h:mm a')}</div>
          : ''
        */
      }
      
    </div>
    <div className={cardHeaderItemContainer}>
      <i className={job.remote_work === 0 ? `fa fa-map-marker ${locationPin}` : `fa fa-map-marker ${locationIconNoHover}`} onClick={() => {
        if (job.remote_work === 0) {
          window.open(mapsLink)
        }
      }} aria-hidden="true"></i>
      <div className={cardLocation}>{
        job.remote_work === 0 
          ? mapsLink !== undefined && mapsLink !== ''
            ? <a className={googleMapsLinkStyle} target="_blank" href={mapsLink}>{job.location}</a>
            : job.location
          : 'Remote work'
      }</div>
    </div>
    <div className={lastThing}>
      <i className={`fa fa-usd ${moneyIcon}`} aria-hidden="true"></i> 
      <span>{job.paid === 0 ? 'Not paid' : 'Paid job'}</span>
    </div> 

    {
      page !== 'applications'
        ? <div>
          
            {
              /*<div className={applicantsContainer}>
                <i className={`fa fa-clock-o ${clock} ${
                    ((job.applicant_count / job.max_applicants) * 100) >= 0 && ((job.applicant_count / job.max_applicants) * 100) <= 50
                        ? clock_0_50 :
                    
                    ((job.applicant_count / job.max_applicants) * 100) >= 51 && ((job.applicant_count / job.max_applicants) * 100) <= 75
                        ? clock_51_75 :
                    
                      ((job.applicant_count / job.max_applicants) * 100) >= 76 && ((job.applicant_count / job.max_applicants) * 100) <= 100
                        ? clock_76_100 :
                    ''   
                }`} aria-hidden="true"></i>
                {`${job.max_applicants - job.applicant_count} of ${job.max_applicants} applicants left.`}
              </div>*/
            }

          </div> 

        : (   
            <div className={job.state == "REJECTED" ? hideDisplay : statuses}>
                <div className={job.state == "REJECTED" ? hideDisplay : ''}>Application Process:</div>
                {
                  job.state == "INITIAL" && job.active == 1
                    ? <div className={applicationProgress}>
                        <div className={statusItem}>
                          <div className={statusIcon} data-tip="Resume and application sent to employer."></div>
                            <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>

                        <div className={statusItem + ' ' + notActive}>
                          <div className={notActiveStatusIcon} data-tip="Employer has signaled intent to contact you. They will reach out to you shortly."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>

                        <div className={statusItem + ' ' + notActive}>
                          <div className={notActiveStatusIcon} data-tip="You got the job! Great work."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>
                      </div>
                    : ''
                }

                {
                  job.state == "CONTACTED" && job.active == 1
                    ? <div className={applicationProgress}>
                        <div className={statusItem}>
                          <div className={statusIcon} data-tip="Resume and application sent to employer."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>

                        <div className={statusItem}>
                          <div className={statusIcon} data-tip="Employer has signaled intent to contact you. They will reach out to you shortly."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>

                        <div className={statusItem + ' ' + notActive}>
                          <div className={notActiveStatusIcon} data-tip="You got the job! Great work."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>
                      </div>
                    : ''
                }

                {
                  job.state == "HIRED" 
                    ? <div className={applicationProgress}>
                        <div className={statusItem}>
                          <div className={statusIcon} data-tip="Resume and application sent to employer."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>

                        <div className={statusItem}>
                          <div className={statusIcon} data-tip="Employer has signaled intent to contact you. They will reach out to you shortly."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>

                        <div className={statusItem}>
                          <div className={statusIcon} data-tip="You got the job! Great work."></div>
                          <ReactTooltip place="bottom" type="info" effect="float" />
                        </div>
                      </div>
                    : ''
                }

                {
                  job.state == "REJECTED" && job.active == 0
                    ? <div>
                        <div className={statusItemRejected}>
                          <div className={statusIconReject}></div>
                          <div className={statusText}>We're sorry to inform you that the employer has decided to go with another 
                            candidate for this position. Don't get discouraged, keep applying!</div>
                        </div>
                      </div>
                    : ''
                }
              </div>
          )
    }
  </div>
)


//Accept job object which contains the proptypes.
export default function JobCardModal({ 
    title, questions, job, industries, cardType, mapsLink,
    updateAnswerText, 
    closeJobAppModal,
    openConfirmApplyModal,
    handleOpenEmployerProfileModal,
    handlePinJob,
    page
  }) { 
  return (
    <div className={cardModalContainer}>

            <div className={cardLeft}>
              <div className={cardLeftTopContainer}>
                <div className={imgContainer}>
                  { 
                    job.logo_url === undefined || job.logo_url == "" || job.logo_url == null
                      ? <div className={altImageContainer}><i className={'fa fa-building-o'} aria-hidden="true"></i></div>
                      : job.logo_url.indexOf("avatar") !== -1
                        ? <img src={config.mediaUrl + job.logo_url}/>
                        : <div className={altImageContainer}><i className={'fa fa-building-o'} aria-hidden="true"></i></div>
                  }
                </div>
                <div className={cardSectionMain}>
                  <div className={cardHeaderItemMainText}>{title}</div>

                  
                  <div className={window.isMobile ? smallJobTypeTitle : ''}>{job.type === 1 
                      ? 'One Time Gig' :
                      job.type === 2 
                      ? 'Summer' :
                      job.type === 3 
                      ? 'Winter' :
                      job.type === 4
                      ? 'Freelance' :
                      job.type === 5
                      ? 'Campus Rep' :
                      job.type === 6
                      ? 'Part-time' :
                      ''
                    }</div>
                  <div className={cardHeaderItemSecondaryText + ' ' + companyInfo} onClick={() => {

                    /*
                      * Opening the Employer Profile Modal
                      */
                        
                      let employerInfo = {
                        logoUrl: config.mediaUrl + job.logo_url,
                        employerName: job.company_name,
                        industry: industries[job.industry],
                        about: job.description,
                        numEmployees: job.employee_count,
                        headquarters: job.office_address + ", " + job.office_city + " " + job.office_postal_code,
                        website: job.website
                      }

                        handleOpenEmployerProfileModal(employerInfo)
                      }}>{job.company_name}</div> 

       
                  <div className={cardHeaderItemAltItemText}>{industries[job.industry]}</div>
                </div>
              </div>

              {/*
                window.isMobile
                  ? <div className={divider1}></div>
                  : ''
              */}
              
              <div className={cardBottomContainer}>

              {
                
                /*
                  * If we're on mobile, we DO want it to render here.
                  * If we're on desktop, we don't want it to render here.
                  * 
                  * [JOB SPECIAL DETAILS RENDER]
                  * 
                  * If we're on the mobile phone, we don't want to show this
                  * information here.
                  * 
                  * We show it close to the top instead.
                  */
                
                window.isMobile 
                  ? <SupplementalJobItemsInfo job={job} mapsLink={mapsLink} page={page} />
                  : ''
                
              }

              {
                
                /*
                 * We don't need to show Description on the Job Card Modal.
                 * This is redundant information. You can just click the company name 
                 * and see more about them that way.
                 */

                !window.isMobile
                  ? ''
                  : <div className={cardSectionOne}>
                      <div className={cardSectionTitle}>About {job.company_name}</div>
                      <div className={cardSectionText}>{job.description}</div>
                    </div>
              }

                  {
                      job.compensation !== ""
                      ? <div className={cardSectionOne}>
                            <div className={cardSectionTitle}>Compensation</div>
                            <div className={cardSectionText}><pre>{job.compensation}</pre></div>
                        </div>
                    : ''
                  }
                
                <div className={cardSectionOne}>
                    <div className={cardSectionTitle}>Responsibilities</div>
                    <div className={cardSectionText}><pre>{job.responsibilities}</pre></div>
                </div>
                <div className={cardSectionOne}>
                    <div className={cardSectionTitle}>Qualifications</div>
                    <div className={cardSectionText}><pre>{job.qualification}</pre></div>
                </div>
                {
                  job.desired_skills !== null && job.desired_skills !== ''
                    ? <div className={cardSectionOne}>
                        <div className={cardSectionTitle}>Desired Skills</div>
                        <div className={cardSectionText}>{job.desired_skills}</div>
                    </div>
                    : 
                    ''
                }

                  
                  {
                    window.isMobile 
                      ? <QuestionsSubcomponent updateAnswerText={updateAnswerText} cardType={cardType} questions={questions} job={job}/>
                      : ''
                  }

              </div>
            </div>


            <div className={cardRight}>


            {

              /*
               * If we're on mobile, we don't want it to render here.
               * If we're on desktop, we want it to render here.
               */

              window.isMobile 
                ? ''
                : <SupplementalJobItemsInfo job={job} mapsLink={mapsLink} page={page}/>
            }
            

            
            {
             /* 
              * ========= Questions ==========
              *
              * If there are even questions that need to be shown, we will display them.
              * We need to first check for the selectedJob attribute to exist (it only)
              * exists when we actually select a job.
              *
              * If the cardtype IS NOT 'createjob', its being used by a regular component (used by all 
              * screens). 
              *
              * If the cardtype IS 'createjob', then it's where we mock the modal. The way we rx 
              * the question text is different.
              */

              window.isMobile 
                ? ''
                : <QuestionsSubcomponent updateAnswerText={updateAnswerText} cardType={cardType} questions={questions} job={job}/>
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

                {
                 /*
                  * PIN JOB button
                  *
                  * The pin job button can be used only the pinnedjobs, dashboard and invites
                  * page but cannot be used on applications page because they've already applied,
                  * there's no need to pin the job at this point.
                  */
                }

                  {
                    cardType == "pinnedjobs" || cardType == "dashboard" || cardType == "invitations"
                      ? <button onClick={(e) => handlePinJob(e, job)} >
                          { job.pinned == 0 ? 'PIN JOB' : 'UNPIN JOB'}
                        </button>
                      : ''
                  }

                {
                 /*
                  * APPLY button
                  *
                  * The apply button can be used on every page except the My Applications
                  * page because they've already applied to the job.
                  */
                }

                  {
                    cardType != "applications" 
                      ? job.applicant_count < job.max_applicants
                        ? <button onClick={openConfirmApplyModal}>APPLY</button>
                        : ''
                      : ''
                  }

                  {
                    cardType === "applications" || cardType == "createjob"
                      ? <button onClick={closeJobAppModal}>CLOSE</button>
                      : ''
                  }
                  
                </div>
              </div>
            </div>

            

            
              
    
    </div>
  )
}

