
/*
 * app/modules/SharedComponents/components/ApplicantCount.js
 *
 * This is the reusable Applicant Count component that shows a nice visual.
 */

import React, { PropTypes } from 'react'
import { applicantsContainer, clock_0_50, clock_51_75, clock_76_100, clock } from '../styles/ApplicantCountStyles.css'

export default function ApplicantCount ({numApplicants, maxApplicants}) {

  return (
    <div className={applicantsContainer}>
      <i className={`fa fa-clock-o ${clock} ${
          ((numApplicants / maxApplicants) * 100) >= 0 && ((numApplicants / maxApplicants) * 100) <= 50
              ? clock_0_50 :
          
          ((numApplicants / maxApplicants) * 100) >= 51 && ((numApplicants / maxApplicants) * 100) <= 75
              ? clock_51_75 :
          
              ((numApplicants / maxApplicants) * 100) >= 76 && ((numApplicants / maxApplicants) * 100) <= 100
              ? clock_76_100 :
          ''   
      }`} aria-hidden="true"></i>
      {`${maxApplicants - numApplicants} of ${maxApplicants} applicants left.`}
    </div>
  )
}





