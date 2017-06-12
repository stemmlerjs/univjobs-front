
// ================REACT BUILTINS============================== //

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import config from 'config'

import { cardContainer, cardTopContainer, imgContainer, cardSectionMain,
        cardHeaderItemMainText, cardHeaderItemSecondaryText, cardHeaderItemAltItemText,
        cardHeaderItemContainer, cardLocation, cardBottomContainer, cardSectionOne,
        cardSectionTwo, cardSectionTitle, cardSectionText, cardActionButtons,
        rejectedCard, activeCard, jobTypeText, cardSectionAlt, cardSectionAltItem,
        cardSectionAltItemContainer, cardSectionAltItemGrey, paidContainer,
        distanceContainer, companyInfoClickContainer, companyInfo, applicantsContainer, 
        clock, clock_0_50, clock_51_75, clock_76_100 } from '../styles/JobCard.css'
import { pageMainJobCards, rotateIcon, applyButton } from 'modules/SharedComponents/styles/StudentCard.css'


export default function JobCard ({logoUrl, pinned, jobObject, jobId, title, jobType,
    industries, industry, companyName, officeAddress, officeCity, startDate,
    compensation, cardType, state, page,
    handlePinJob, handleCardClick,
    handleRemoveJob, handleOpenEmployerProfileModal}) {
  return (
    <div className={page == "applications" 
                        ? state == "REJECTED" || jobObject.active == 0
                            ? cardContainer + ' ' + rejectedCard 
                            : cardContainer + ' ' + activeCard
                        : cardContainer }>
        <div className={jobTypeText}>{jobType}</div>
        <div className={cardTopContainer}>
            
            <div className={imgContainer}>
                <img src={logoUrl}></img>
            </div>
            <div className={companyInfoClickContainer} onClick={() => {

                /*
                 * Opening the Employer Profile Modal
                 */
                
                let employerInfo = {
                  logoUrl: logoUrl,
                  employerName: companyName,
                  industry: industry,
                  about: jobObject.description,
                  numEmployees: jobObject.employee_count,
                  headquarters: officeAddress + ", " + officeCity + " " + jobObject.office_postal_code,
                  website: jobObject.website
                }

                handleOpenEmployerProfileModal(employerInfo)
            }}>
                <span className={companyInfo}>Company info</span>
            </div>
        </div>
        
        <div className={cardSectionMain}>
            <div className={cardHeaderItemMainText}>{title}</div>
            <div className={cardHeaderItemSecondaryText}>{companyName}</div> 
            <div className={cardHeaderItemAltItemText}>{officeAddress + ", " + officeCity}</div>
        </div>

        {
           /*
            * Three sections
            */
        }

        <div className={cardSectionAlt}>
            <div className={paidContainer}>
                <div className={cardSectionAltItem}>Paid</div>
                <div className={cardSectionAltItemGrey}>{jobObject.paid == 0 ? 'No' : 'Yes'}</div>
            </div>
            <div className={cardSectionAltItemContainer}>
                <div className={cardSectionAltItem}>Start Date</div>
                <div className={cardSectionAltItemGrey}>{startDate}</div>
            </div>
            <div className={distanceContainer}>
                <div className={cardSectionAltItem}>School Distance</div>
                <div className={cardSectionAltItemGrey}>25 KM</div>
            </div>
        </div>

        {
           /*
            * Applicants left section
            */
        }

        <div className={applicantsContainer}>
            <i className={`fa fa-clock-o ${clock} ${
                ((jobObject.applicant_count / jobObject.max_applicants) * 100) >= 0 && ((jobObject.applicant_count / jobObject.max_applicants) * 100) <= 50
                    ? clock_0_50 :
                
                ((jobObject.applicant_count / jobObject.max_applicants) * 100) >= 51 && ((jobObject.applicant_count / jobObject.max_applicants) * 100) <= 75
                    ? clock_51_75 :
                
                 ((jobObject.applicant_count / jobObject.max_applicants) * 100) >= 76 && ((jobObject.applicant_count / jobObject.max_applicants) * 100) <= 100
                    ? clock_76_100 :
                ''   
            }`} aria-hidden="true"></i>
            {`${jobObject.max_applicants - jobObject.applicant_count} of ${jobObject.max_applicants} applicants left.`}
        </div>
        <div className={cardBottomContainer}>
          
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
              cardType == "pinnedjobs" || cardType == "dashboard"
                ? <button onClick={(e) => handlePinJob(e, jobObject)} >
                    { pinned == 0 ? 'PIN JOB' : 'UNPIN JOB'}
                  </button>
                : ''
            }

            {
                cardType == "applications" && jobObject.state == "REJECTED" && jobObject.hidden == 0
                    ? <button onClick={(e) => handleRemoveJob(e, jobObject)} >REMOVE</button>
                    : ''
            }

            <button onClick={(e) => handleCardClick(e, jobObject)}>SEE MORE</button>
          </div>
        </div>
             
    </div>
  )
}


//  <button  onClick={(e) => handleCardClick(e, jobObject)}>APPLY</button>