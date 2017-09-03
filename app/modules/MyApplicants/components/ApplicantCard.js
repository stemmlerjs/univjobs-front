
/*
 * ApplicantCard
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { applicantCardContainer, applicantImageContainer, applicantDetailsContainer, applicantNameText, applicantButtonCorner,
  applicantSchoolText, applicantMajorText } from '../styles/ApplicantCardStyles.css'

export default function ApplicantCard ({ applicant }) {
  return (
    <div 
      onClick={() => {
        console.log(`We're going to show the student profile=${applicant.student_id} when we click this`)
      }} 
      className={applicantCardContainer}>
      <div className={applicantImageContainer}>
        <img src="http://localhost:8000/avatar/profilepicture-1501743453728.png"/>
      </div>
      <div className={applicantDetailsContainer}>
        <div className={applicantNameText}>{ applicant.name }</div>
        <div className={applicantSchoolText}>Sheridan College</div>
        <div className={applicantMajorText}>Computing and Network Telecommunications</div>
      </div>
      <div className={applicantButtonCorner}></div>
    </div>
  )
}


