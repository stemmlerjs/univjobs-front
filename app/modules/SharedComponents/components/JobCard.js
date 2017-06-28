
// ================REACT BUILTINS============================== //

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import config from 'config'

import { cardContainer, cardTopContainer, imgContainer, cardSectionMain,
        cardHeaderItemMainText, cardHeaderItemSecondaryText, cardHeaderItemAltItemText,
        cardHeaderItemContainer, cardLocation, cardBottomContainer, cardSectionOne,
        cardSectionTwo, cardSectionTitle, cardSectionText, cardActionButtons,
        rejectedCard, activeCard, jobTypeText, cardSectionAlt, cardSectionAltItem,
        cardSectionAltItemContainer, cardSectionAltItemGrey, paidContainer, calendarIcon, locationIcon, locationIconNoHover,
        distanceContainer, companyInfoClickContainer, companyInfo, applicantsContainer, 
        clock, clock_0_50, clock_51_75, clock_76_100, lastThing, moneyIcon, flexColumn, 
        googleMapsLinkStyle } from '../styles/JobCard.css'
import { pageMainJobCards, rotateIcon, applyButton } from 'modules/SharedComponents/styles/StudentCard.css'


export default function JobCard ({logoUrl, pinned, jobObject, jobId, title, jobType,
    industries, industry, companyName, officeAddress, officeCity, startDate,
    compensation, cardType, state, page, location, remoteWork, paid, mapsLink,
    handlePinJob, handleCardClick,
    handleRemoveJob, handleOpenEmployerProfileModal}) {
  return (
    <div className={page == "applications" 
                        ? state == "REJECTED" || jobObject.active == 0
                            ? cardContainer + ' ' + rejectedCard 
                            : cardContainer + ' ' + activeCard
                        : cardContainer }>
        {
           /*
            * TOP SECTION
            */
        }

        <div className={cardTopContainer}>
          <div className={imgContainer}>
            <img src={logoUrl}></img>
          </div>

          <div className={cardSectionMain}>
            <div className={cardHeaderItemMainText}>{title}</div>
            <div>{jobType}</div>
            <div className={cardHeaderItemSecondaryText + ' ' + companyInfo} onClick={() => {

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
                }}>{companyName}</div> 
            <div className={cardHeaderItemAltItemText}>{industry}</div>
          </div>
        </div>
        
        {
           /*
            * Three sections
            */
        }

        <div className={cardSectionAlt}>
          <div className={flexColumn}>
            <div>
              <i className={`fa fa-calendar ${calendarIcon}`} aria-hidden="true"></i> 
              <span>{startDate}</span>
            </div>
            <div className={lastThing}>
              <i className={`fa fa-usd ${moneyIcon}`} aria-hidden="true"></i> 
              <span>{paid === 0 ? 'Not paid' : 'Paid job'}</span>
            </div> 
          </div>
          <div>
            <div><i className={`fa fa-map-marker ${ mapsLink == undefined ? locationIconNoHover : locationIcon}`} onClick={() => {
              if (mapsLink !== undefined) {
                window.open(mapsLink)
              }
            }} aria-hidden="true"></i></div>
            <div><span>{remoteWork === 0 
              ? mapsLink !== undefined && mapsLink !== '' 
                  ? <a className={googleMapsLinkStyle} target="_blank" href={mapsLink}>{location}</a>
                  : location 
              : 'Remote work'}</span></div>
          </div>
        </div>
           

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


