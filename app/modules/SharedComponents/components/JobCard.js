
// ================REACT BUILTINS============================== //

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import config from 'config'

import { cardContainer, cardTopContainer, imgContainer, cardHeaderContainer,
        cardHeaderItemMainText, cardHeaderItemSecondaryText, cardHeaderItemAltItemText,
        cardHeaderItemContainer, cardLocation, cardBottomContainer, cardSectionOne,
        cardSectionTwo, cardSectionTitle, cardSectionText, cardActionButtons,
        rejectedCard, activeCard  }from '../styles/JobCard.css'
import { pageMainJobCards, rotateIcon, applyButton } from 'modules/SharedComponents/styles/StudentCard.css'

// JobCard.propTypes = {
//   cardType: PropTypes.string.isRequired,
//   job: PropTypes.object,
//   jobTypes: PropTypes.array,
//   industries: PropTypes.array,
//   handleCardClick: PropTypes.func.isRequired
// }

export default function JobCard ({logoUrl, pinned, jobObject, jobId, title, 
    industries, industry, companyName, officeAddress, officeCity, startDate,
    compensation, cardType, state, page,
    handlePinJob, handleCardClick,
    handleRemoveJob}) {
  return (
    <div className={page == "applications" 
                        ? state == "REJECTED" || jobObject.active == 0
                            ? cardContainer + ' ' + rejectedCard 
                            : cardContainer + ' ' + activeCard
                        : cardContainer }>
        <div className={cardTopContainer}>
            <div className={imgContainer}>
                <img src={logoUrl}></img>
            </div>
             <div className={cardHeaderContainer}>
                <div className={cardHeaderItemMainText}>{title}</div>
                <div className={cardHeaderItemSecondaryText}>{industry}</div> 
                <div className={cardHeaderItemAltItemText}>{companyName}</div>
                <div className={cardHeaderItemContainer}>
                    <img data-tip="Job location" src={`${config.assetUrl}components/cards/student/actions/a/has_car_active_24px.svg`}/>
                    <div className={cardLocation}>{officeAddress + ", " + officeCity}</div>
                </div>
            </div>
        </div>
        <div className={cardBottomContainer}>
          <div className={cardSectionOne}>
              <div className={cardSectionTitle}>Start Date</div>
              <div className={cardSectionText}>{startDate}</div>
          </div>
          <div className={cardSectionTwo}>
              <div className={cardSectionTitle}>Compensation</div>
              <div className={cardSectionText}>{compensation}</div>
          </div>
          
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