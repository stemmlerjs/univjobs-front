
/* 
 * StudentCard
 * 
 * This components is to display the card from students for employers to hire or invite
 *
 * NOTE: This might be the same as Application Generic Card
 * TODO: Check if the Application Generic Card is the same
 * 
 */

// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

import config from 'config'
import ReactTooltip from 'react-tooltip'

import { studentProfileModalContainer, studentProfileLeftContainer, stProfileHeader, stProfileImageContainer, stProfileImageContainerAlt,
  stProfileNameAndSchool, stProfileName, stProfileProgram, studenProfileRightContainer, stProfileGrad, itemIcon, experienceHobbiesEtc,
  listItemContainer, itemIconGPA, supplementalItemsContainer, supplementalItemsDetail, invite, leftsideDetails,
  buttons, whiteTxt, questionText, questionHeader, questionContainer, buttonsContainer, questionsAndAnswersContainer,
  hiddenContactInfo, loader, languagesItemIcon } from '../styles/StudentProfileModal.css'

import { altImageContainer } from '../styles/StudentCard.css'

const StudentProfileModal = ({ pictureUrl, name, major, sportsString, languagesString,
  schoolName, hometown, hasCar, clubsString, gradDate, lists, gpa, funFact, hobbies,
  handleOpenInviteStudentModal, studentObj, recentCompanyName, recentCompanyPosition, 
  
  isDashboardCard, resumeUrl, questions, answers, isContacting, preferredEmail,
  isHiring,
  handleOpenConfirmRejectStudentModal,
  handleContactStudent,
  handleOpenConfirmHireStudentModal}) => (

    <div className={studentProfileModalContainer}>
      <div className={studentProfileLeftContainer}>

        {
         /*
          * Header Section
          */
        }
        <div className={stProfileHeader}>
          <div className={pictureUrl.indexOf("null") === -1 ? stProfileImageContainer : stProfileImageContainerAlt}>

              {
                pictureUrl.indexOf("null") === -1
                  ? <img src={pictureUrl}/>
                  : <div className={altImageContainer}><i className={'fa fa-user'} aria-hidden="true"></i></div>
              }
            
          </div>
          <div className={stProfileNameAndSchool}>
            <div className={stProfileName}>{name}</div>
            <div className={stProfileProgram}>{lists.majors[major]}</div>
            <div className={stProfileGrad}>{schoolName} {gradDate.getFullYear()}</div>
          </div>
        </div>

        {
         /*
          * Hobbies, job experience, etc
          */
        }

        <div className={leftsideDetails}>
          
              <div className={supplementalItemsContainer}>
                {!isDashboardCard
                  ? <div>
                      <div><b>Contact Info</b></div>
                      {
                        preferredEmail 
                          ? <div className={supplementalItemsDetail}>{preferredEmail}</div>
                          : <div className={hiddenContactInfo}>Hidden until you signal intent to contact</div>
                      }
                      
                    </div>
                  : ''}

                {
                  recentCompanyName !== ""
                    ? <div>
                        <div><b>Previous Work Experience</b></div>
                        <div className={supplementalItemsDetail}>{recentCompanyPosition} at {recentCompanyName}</div>
                      </div>
                    : ''
                }
                {
                  hometown 
                    ? <div>
                        <div><b>Hometown</b></div>
                        <div className={supplementalItemsDetail}>{hometown}</div>
                      </div>
                    : ''
                }
                {
                  funFact
                    ? <div>
                        <div><b>Fun Fact</b></div>
                        <div className={supplementalItemsDetail}>{funFact}</div>
                      </div>
                    : ''
                }
                {
                  hobbies
                    ? <div>
                        <div><b>Hobbies</b></div>
                        <div className={supplementalItemsDetail}>{ hobbies }</div>
                      </div>
                    : ''
                }
                {
                  studentObj.edu_level
                    ? <div>
                        <div><b>Degree Type</b></div>
                        <div className={supplementalItemsDetail}>{ lists.educationLevels[studentObj.edu_level] }</div>
                      </div>
                    : ''
                }
                {
                  gradDate
                    ? <div>
                        <div><b>Graduation Date</b></div>
                        <div className={supplementalItemsDetail}>{ gradDate.getFullYear() }</div>
                      </div>
                    : ''
                }
                {
                  studentObj.status
                    ? <div>
                        <div><b>Student Status</b></div>
                        <div className={supplementalItemsDetail}>{ lists.studentStatus[studentObj.status] }</div>
                      </div>
                    : ''
                }
              </div>
        </div>
      </div>


      <div className={studenProfileRightContainer}>
        <div className={experienceHobbiesEtc}>
        { hasCar == 1
                ? <div className={listItemContainer}>
                    <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                    <img data-tip={'Transportation availability'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/has_car_active_24px.svg`}/>
                    <div>Daily access to a vehicle</div>
                  </div>
                : ''
            }
            { sportsString !== ""
                ? <div className={listItemContainer}>
                    <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                    <img data-tip={'Sports'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/sports_active_24px.svg`}/>
                    <div>{sportsString}</div>
                  </div>
                : ''
            }
            { clubsString !== ""
                ? <div className={listItemContainer}>
                    <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                    <img data-tip={'Clubs'} className={itemIcon} src={`${config.assetUrl}components/cards/student/actions/a/clubs_active_24px.svg`}/>
                    <div>{clubsString}</div>
                  </div>
                : ''
            }
            { gpa 
                ? <div className={listItemContainer}>
                    <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                    <div data-tip={'GPA'} className={`${itemIcon} ${itemIconGPA}`}>{Number(gpa).toFixed(2)}</div>
                    <div>GPA of {Number(gpa).toFixed(2)}</div>
                  </div>
                : ''
            }
            { languagesString !== ""
                ? <div className={listItemContainer}>
                    <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                    <i data-tip={'Languages'} aria-hidden="true" className={`fa fa-language ${languagesItemIcon}`}></i>
                    <div>{languagesString}</div>
                  </div>
                : ''
            }
          </div>

        {
         /* =====================================
          *     QUESTIONS AND ANSWERS
          * =====================================
          */
        }

        { !isDashboardCard
            ? <div className={questionsAndAnswersContainer}>
                {
                  questions.map((question, index) => {

                    return (
                      <div className={questionContainer} key={question.question_id}>
                        <div>
                          <span className={questionHeader}>{"Q" + (index + 1) + ": "}</span>
                          <span className={questionText}>{question.text}</span>
                        </div>
                        { answers.filter((answer) => answer.question_id == question.question_id)
                            .map((answer) => {
                              return (
                                <div key={answer.question_id}>
                                  <span className={questionHeader}>{"A" + (index + 1) + ": "}</span>
                                  <span className={questionText}>{answer.text}</span>
                                </div>
                              )
                            })
                        }
                      </div>
                    )
                  })
                }
              </div>
            : ''
        }
        
        {
         /* =====================================
          *     ACTION BUTTONS
          * =====================================
          */
        }

        {
          isDashboardCard
            ? <div>
                <button className={invite} onClick={
                  function() {
                      handleOpenInviteStudentModal(studentObj)
                  }
                }>INVITE</button>
              </div>
            : <div className={buttonsContainer}>

                <button className={buttons} onClick={

                 /*
                  * CONFIRM if you want to Reject the student.
                  */

                  function () {
                    handleOpenConfirmRejectStudentModal(studentObj)
                  }
                }>REJECT</button>

                  {
                    resumeUrl.indexOf('null') == -1
                      ? <button className={buttons}><a className={whiteTxt} target="_blank" href={resumeUrl}>RESUME</a></button>
                      : ''
                  }
                
                  {
                    studentObj.state === "INITIAL"
                      ? <button className={buttons} onClick={

                         /*
                          * DO signal intent to contact student.
                          */

                          function () {
                            handleContactStudent(studentObj)
                          }
                        }>CONTACT</button>
                      : <button className={buttons} onClick={

                         /*
                          * CONFIRM if you want to Hire the student.
                          */

                          function () {
                            handleOpenConfirmHireStudentModal(studentObj)
                          }
                        }>HIRE</button>
                  }
              </div>
        }

        
        
      </div>
    </div>
)

export default StudentProfileModal
