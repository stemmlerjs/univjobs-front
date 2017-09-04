

/*
 * ApplicantSidebar
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { applicantSidebarContainer, hide, sidebarContainer, headerContainer, imgContainer,
  headerDetailsContainer, bodyContainer, profileNameText, programNameText, schoolText } from '../styles/ApplicantSidebarStyles.css'

import config from 'config'

export default function ApplicantSidebar ({ selectedApplicant }) {
  console.log("This is the selected applicant", selectedApplicant)
  return (
    <div className={selectedApplicant.job_id ? applicantSidebarContainer : `${applicantSidebarContainer} ${hide}`}>

      {
        /*
         * This is the Applicant sidebar section. 
         *
         * It should look similar to the StudentCardModal and should have all 
         * of that applicant information available.
         * 
         * It needs to have the student details, questions, answers, etc
         * for this job
         */
      }
      <div className={sidebarContainer}>
        <div className={headerContainer}>
          <div className={imgContainer}>
            <img src={config.mediaUrl + "avatar/" + selectedApplicant.photo_url}/>
          </div>
          <div className={headerDetailsContainer}>
            <div className={profileNameText}>{`${selectedApplicant.user_firstName} ${selectedApplicant.user_lastName}`}</div>
            <div className={programNameText}>Makeup for Media and Creative Arts</div>
            <div className={schoolText}>Sheridan College</div>
          </div>
        </div>
        
        <div className={bodyContainer}>
          <div>Previous Work Experience</div>
          <div>{selectedApplicant.recent_company_position} at {selectedApplicant.recent_company_name}</div>
        </div>
      </div>


    </div>
  )
}
