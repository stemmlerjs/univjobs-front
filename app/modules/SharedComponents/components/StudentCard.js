
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
import ReactTooltip from 'react-tooltip'

import config from 'config'

// ================CSS IMPORTS============================== //

import { pageContainer, cardContainer, card,
    cardHeaderItem, cardHeaderItemText, cardHeaderItemImage, 
    cardHeaderItemIcon, studentMajor, studentMajorItem, 
    studentMajorData, studentNameTitle, width, schoolNameContainer, 
    schoolTitle,  headerDivider, classYearContainer, 
    classYearItem, tagContainer, tagItems, firstTagItems,
	tagIcon, iconName, studentInfoContainer, studentInfoItem,
    studentIcon, studentInfo, pastJobsContainer, 
    pastJobsItems, pastJobsLabel, pastJobsInfo,
    buttonsContainer, buttonItems, buttonIcons, cardModalContainer, 
    cardModalHeader, jobModalTitle, jobModalIndustry, cardModalBodyLeft, cardModalBodyRight, cardModalScroll, cardModalFooter,
	image, questionHeader, crop, imgContainer, cardTopContainer, cardBottomContainer, cardHeaderContainer,
    cardHeaderItemContainer, cardHeaderItemMainText, cardHeaderItemSecondaryText, cardHeaderItemAltItemText,
    cardSectionOne, cardSectionTwo, cardActionButtons, cardSectionTitle, cardSectionText, whiteTxt, gpaTextActive, gpaTextDeactive,
    cardContainer__contacted, hidden, altImageContainer } from '../styles/StudentCard.css'

/*
StudentCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  job: PropTypes.object,
  jobTypes: PropTypes.array,
  industries: PropTypes.array,
  handleCardClick: PropTypes.func.isRequired
}
*/

 /*
  * isDashboardCard = true:
  * => Card state 1 is the Employer Dashboard. This is just when employers are browsing students.
  * => actionable buttons are in this order: (SEE MORE, INVITE)
  *
  * isDashboardCard = false or undefined:
  * => Card state 2 is the My Applicants Dashboard before CONTACTing a student.
  * => Actionable buttons are (REJECT, RESUME, SEE MORE)
  *
  */

const StudentCard = ({pictureUrl, resumeUrl, name, major, funFact, recentCompanyName, 
    recentPosition, email, isDashboardCard, studentObj, hasCar, lists,
    sports,
    clubs,
    languages,
    gpa,
    gradDate,
    schoolName,
    hometown,
    hobbies,
    state,
    handleOpenStudentProfileModal,
    handleCloseStudentProfileModal,
    handleOpenInviteStudentModal,
    handleCloseInviteStudentModal,
    handleOpenConfirmRejectStudentModal,
    handleCloseConfirmRejectStudentModal,
    handleOpenStudentProfileAndAnswersModal,
    handleCloseStudentProfileAndAnswersModal
}) => (

   /*
    * If we're on the Applicants page, we want to style the card differently if 
    * we've already CONTACTED the students.
    *
    * If we're on the Employer Dashboard, we just want to show all cards normally.
    */
    
    <div className={!isDashboardCard 
        ? (state == 'CONTACTED' 
            ? cardContainer__contacted 
            : (state == 'INITIAL' 
                ? cardContainer
                : hidden ) 
        )
        : cardContainer
    }>
        <div className={cardTopContainer}>
            <div className={imgContainer}>
              {
                pictureUrl.indexOf("null") === -1
                  ? <img src={pictureUrl}/>
                  : <div className={altImageContainer}><i className={'fa fa-user'} aria-hidden="true"></i></div>
              }
            </div>
            <div className={cardHeaderContainer}>
                <div className={cardHeaderItemMainText}>{name}</div>
                <div className={cardHeaderItemSecondaryText}>{major}
                </div>
                <div className={cardHeaderItemAltItemText}>{schoolName} {gradDate.getFullYear()}</div>
                <div className={cardHeaderItemContainer}>
                  {
                   /*
                    * Has Car rendering
                    */
                  }
                    <div>
                        { hasCar == 1
                          ? <div>
                              <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                              <img data-tip="Daily access to a vehicle" src={`${config.assetUrl}components/cards/student/actions/a/has_car_active_24px.svg`}/>
                            </div>
                          : <img src={`${config.assetUrl}components/cards/student/actions/d/has_car_deactive_24px.svg`}/>
                        }
                    </div>
                    <div>
                      {
                       /*
                        * Sports rendering
                        */
                      }
                        {
                          Object.keys(sports).length !== 0
                            ? Object.keys(sports).length == 1
                              ? <div>
                                  <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                                  <img data-tip={'Plays ' + sports[Object.keys(sports)[0]] + "."} src={`${config.assetUrl}components/cards/student/actions/a/sports_active_24px.svg`}/>
                                </div>
                              : <div>
                                  <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                                  <img data-tip={'Plays ' + sports[Object.keys(sports)[0]] + " and " + Object.keys(sports).length + " more sports."} src={`${config.assetUrl}components/cards/student/actions/a/sports_active_24px.svg`}/>
                                </div>
                            : <img src={`${config.assetUrl}components/cards/student/actions/d/sports_deactive_24px.svg`}/>
                        }
                    </div>
                    <div>
                      {
                       /*
                        * Clubs rendering
                        */
                      }
                        {
                          Object.keys(clubs).length !== 0
                            ? Object.keys(clubs).length == 1
                              ? <div>
                                  <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                                  <img data-tip={"Involved in clubs like " + clubs[Object.keys(clubs)[0]] + " and " + Object.keys(clubs).length + " more."} src={`${config.assetUrl}components/cards/student/actions/a/clubs_active_24px.svg`}/>
                                </div>
                              : <div>
                                  <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                                  <img data-tip={"Involved in " + clubs[Object.keys(clubs)[0]] + "."} src={`${config.assetUrl}components/cards/student/actions/a/clubs_active_24px.svg`}/>
                                </div>
                            : <img src={`${config.assetUrl}components/cards/student/actions/d/clubs_deactive_24px.svg`}/>
                        }
                    </div>
                    <div>
                      {
                        /*
                         * GPA rendering
                         */
                      }
                        {
                          gpa 
                            ? <div>
                                <ReactTooltip delayHide={100} delayShow={100} place="bottom" effect="float"/>
                                <div data-tip={`GPA of ${Number(gpa)}`} className={gpaTextActive}>GPA</div>
                              </div>
                            : <div className={gpaTextDeactive}>GPA</div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className={cardBottomContainer}>
            <div className={cardSectionOne}>
              {
               /*
                * SECTION 1
                *
                * If the student has Previous Work Experience, the first thing we're going
                * to show on the card will be the previous work experience.
                *
                * If the student DOES NOT have Previous Work Experience, we will display 
                * their fun fact.
                */
              }
                { recentCompanyName === null || recentCompanyName === "" || recentPosition === null || recentPosition === ""
                    ? <div>
                        <div className={cardSectionTitle}>Fun Fact</div>
                        <div className={cardSectionText}>{ funFact.length >= 83 
                            ? funFact.substring(0, 83) + "..."
                            : funFact
                        }</div>
                      </div>
                    : <div>
                        <div className={cardSectionTitle}>Previous Work Experience</div>
                        <div className={cardSectionText}>
                            {recentPosition} at {recentCompanyName}
                        </div>
                      </div>
                }
                
            </div>
            {
             /* 
              * SECTION 2 
              * 
              * We can only fit one more piece of information here.
              *
              * For the time being, we'll fit Hometown here.
              */
            }
            <div className={cardSectionTwo}>
              <div className={cardSectionTitle}>Hometown</div>
              <div className={cardSectionText}>{hometown}</div>
            </div>
        </div>

        {
         
        }
        { isDashboardCard === true 
            ? (
                <div className={cardActionButtons}>
                    <button onClick={

                        function() {
                            handleOpenStudentProfileModal(studentObj)
                        }
                        
                    }>SEE MORE</button>
                    <button onClick={
                        function() {
                            handleOpenInviteStudentModal(studentObj)
                        }
                    }>INVITE</button>
                </div>
              )
            : (
              <div>
                <div className={cardActionButtons}>
                  <button onClick={() => {
                      handleOpenConfirmRejectStudentModal(studentObj)
                    }}>REJECT
                  </button>

                  {
                    resumeUrl.indexOf('null') === -1
                      ? <button><a className={whiteTxt} target="_blank" href={resumeUrl}>RESUME</a></button>
                      : ''
                  }
                  
                  <button onClick={

                      function () {
                          handleOpenStudentProfileAndAnswersModal(studentObj)
                      }
                      
                  }>MORE</button>
                </div>
              </div>
              )
        }
    </div>
)

export default StudentCard
