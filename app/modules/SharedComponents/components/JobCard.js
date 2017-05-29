
// ================REACT BUILTINS============================== //

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import config from 'config'

import { cardContainer, cardTopContainer, imgContainer, cardHeaderContainer,
        cardHeaderItemMainText, cardHeaderItemSecondaryText, cardHeaderItemAltItemText,
        cardHeaderItemContainer, cardLocation, cardBottomContainer, cardSectionOne,
        cardSectionTwo, cardSectionTitle, cardSectionText, cardActionButtons  }from '../styles/JobCard.css'
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
    compensation,
    handlePinJob, handleCardClick}) {
  return (
    <div className={cardContainer}>
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
            <button onClick={(e) => handlePinJob(e, jobObject)} >
              { pinned == 0 ? 'PIN JOB' : 'UNPIN JOB'}
            </button>

            <button onClick={(e) => handleCardClick(e, jobObject)}>SEE MORE</button>
          </div>
        </div>
             
    </div>
  )
}


//  <button  onClick={(e) => handleCardClick(e, jobObject)}>APPLY</button>