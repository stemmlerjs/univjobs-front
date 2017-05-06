
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
    handleCloseInviteStudentModal,
    handleDoInviteStudent
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

    // <div className={cardContainer}>
    //     <div className={card}>
    //       <header className={cardHeaderContainer}>
    //         <div className={cardHeaderItemImage}>
    //             <img className={crop} src={pictureUrl} alt="Smiley face" />
    //         </div>
    //         <div className={cardHeaderItem}>
    //                 <div>
    //                     <h4 className={studentNameTitle}>Charles Javelona</h4>
    //                     <span className={studentMajor}>
    //                         <p className={studentMajorItem}><b>Major:</b> Marketing Management</p>
    //                     </span>
    //                 </div>
    //                 <div className={width}></div>
    //                 <div className={cardHeaderItemIcon}>
    //                     <i className={"fa fa-refresh fa-2x fa-rotate-90"} aria-hidden="true"></i>
    //                     <br/>
    //                     College<br/>Info
    //                 </div>
    //         </div>
    //       </header>

    //       <div className={headerDivider}></div>

    //       <div className={schoolNameContainer}>
    //            <span className={schoolTitle}>Sheridan College</span> 
    //       </div>
    //       <div className={classYearContainer}>
    //         <h3 className={classYearItem}>Bachelor's, Grad Class of 2019</h3>
    //       </div>
        
    //      <div className={tagContainer}>
    //         <span className={firstTagItems}>
    //             <i className={"fa fa-car " + tagIcon } aria-hidden="true"></i>
    //             <span className={iconName}>Yes</span>
    //         </span>
    //         <span className={tagItems}>
    //             <i className={"fa fa-futbol-o " + tagIcon } aria-hidden="true"></i>
    //             <span className={iconName}>No</span>
    //         </span>
    //         <span className={tagItems}>
    //             <i className={"fa fa-paint-brush " + tagIcon } aria-hidden="true"></i>
    //             <span className={iconName}>Yes</span>
    //         </span>
    //         <span className={tagItems}>
    //             <i className={"fa fa-clipboard " + tagIcon } aria-hidden="true"></i>
    //             <span className={iconName}>C+</span>
    //         </span>
    //      </div>

    //     <div className={studentInfoContainer}>
    //         <span className={studentInfoItem}>
    //             <i className={"fa fa-envelope " + studentIcon } aria-hidden="true"></i>
    //             <span className={studentInfo}>javelonc@sheridancollege.ca</span>
    //         </span>
    //         <span className={studentInfoItem}>
    //             <i className={"fa fa-clipboard " + studentIcon } aria-hidden="true"></i>
    //             <span className={studentInfo}>647-779-8525</span>
    //         </span>
    //         <span className={studentInfoItem}> 
    //             <i className={"fa fa-check " + studentIcon } aria-hidden="true"></i>
    //             <span className={studentInfo}>04/03/2017</span>
    //         </span>
    //     </div>

    //     <div className={pastJobsContainer}>
    //         <div className={pastJobsItems}>
    //             <span className={pastJobsLabel}>Past Job:</span>
    //             <span className={pastJobsInfo}>Line Cook at Jack Astors Grill</span>
    //         </div>
    //     </div>

    //     {showResume 
    //         ?  <a href={resumeUrl} target="_blank">RESUME</a>
    //         : "" 
    //     }
       

    //         {/*Student invited or hired? */}    
    //         { isInviting ? 
    //             <div className={buttonsContainer}>
    //             </div>

    //             :<div className={buttonsContainer}>
    //                 <button className={buttonItems}>
    //                     <i className={"fa fa-file-pdf-o " + buttonIcons} aria-hidden="true"></i>
    //                         Resume
    //                 </button>
    //                 <button className={buttonItems}>
    //                     <i className={"fa fa-thumbs-o-up " + buttonIcons} aria-hidden="true"></i>
    //                         Hire
    //                 </button>
    //             </div>
    //         }
    //     </div>
    // </div>
)

export default StudentCard
