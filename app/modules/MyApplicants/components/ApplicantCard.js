
/*
 * ApplicantCard
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { applicantCardContainer, applicantImageContainer, applicantDetailsContainer, applicantNameText, applicantButtonCorner,
  applicantSchoolText, applicantMajorText, selectedCard } from '../styles/ApplicantCardStyles.css'

export default function ApplicantCard ({ applicant, selectedApplicant, handleViewApplicantDetails }) {
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        handleViewApplicantDetails(applicant)
      }} 
      className={applicant.job_id == selectedApplicant.job_id ? `${applicantCardContainer} ${selectedCard}` : applicantCardContainer}>
      <div className={applicantImageContainer}>
        <img src="http://localhost:8000/avatar/profilepicture-1501743453728.png"/>
      </div>
      <div className={applicantDetailsContainer}>
        <div className={applicantNameText}>{ `${applicant.user_firstName} ${applicant.user_lastName}` }</div>
        <div className={applicantSchoolText}>Sheridan College</div>
        <div className={applicantMajorText}>Computing and Network Telecommunications</div>
      </div>
      <div className={applicantButtonCorner}>
        <i className={"fa fa-square-o"} aria-hidden="true"></i>
      </div>
    </div>
  )
}


