

/*
 * ApplicantSidebar
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { applicantSidebarContainer, hide } from '../styles/ApplicantSidebarStyles.css'

export default function ApplicantSidebar ({ selectedApplicant }) {
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
      
    </div>
  )
}
