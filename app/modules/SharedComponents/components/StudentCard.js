
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
    cardSectionOne, cardSectionTwo, cardActionButtons, cardSectionTitle, cardSectionText } from '../styles/StudentCard.css'

/*
StudentCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  job: PropTypes.object,
  jobTypes: PropTypes.array,
  industries: PropTypes.array,
  handleCardClick: PropTypes.func.isRequired
}
*/

const StudentCard = ({pictureUrl, resumeUrl, name, major, funFact, recentCompanyName, 
    recentPosition, email, isDashboardCard, studentObj,
    handleOpenStudentProfileModal,
    handleCloseStudentProfileModal,
    handleOpenInviteStudentModal,
    handleCloseInviteStudentModal
}) => (

    <div className={cardContainer}>
        <div className={cardTopContainer}>
            <div className={imgContainer}>
                <img src={pictureUrl}></img>
            </div>
            <div className={cardHeaderContainer}>
                <div className={cardHeaderItemMainText}>{name}</div>
                <div className={cardHeaderItemSecondaryText}>Business Administration</div>
                <div className={cardHeaderItemAltItemText}>Sheridan College 2020</div>
                <div className={cardHeaderItemContainer}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div className={cardBottomContainer}>
            <div className={cardSectionOne}>
                { recentCompanyName === null || recentPosition === null 
                    ? <div>
                        <div className={cardSectionTitle}>About Me</div>
                        <div className={cardSectionText}>{funFact}</div>
                      </div>
                    : <div>
                        <div className={cardSectionTitle}>Previous Work Experience</div>
                        <div className={cardSectionText}>
                            {recentPosition}<br></br>at {recentCompanyName}
                        </div>
                      </div>
                }
                
            </div>
            {
             /* 
              * SECTION 2 
              *
              */
            }
            <div className={cardSectionTwo}>
                <div className={cardSectionTitle}>Contact Info</div>
                { isDashboardCard === true 
                    ? <div className={cardSectionText}>
                        Hidden until student applies
                      </div> 
                    : <div className={cardSectionText}>
                        {email}
                      </div>
                }
            </div>
        </div>
        { isDashboardCard === true 
            ? <div className={cardActionButtons}>
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
            : <div className={cardActionButtons}>
                    <button>HIRE</button>
                </div>
        }
    </div>
)

export default StudentCard
