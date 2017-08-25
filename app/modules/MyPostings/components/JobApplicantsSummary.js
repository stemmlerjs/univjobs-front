

import React, { PropTypes } from 'react'
import { container } from '../styles/JobQuestionsStyles.css'

import { altBox } from '../styles/MyPostingsStyles.css'

import { applicantsjobsCountHeader, applicantsjobsCount, divide } from '../styles/JobApplicantsSummaryStyles.css'

export default function JobApplicantsSummary ({ maxApplicants, numApplicants }) {

  return (
    <div className={altBox}>
      <div className={applicantsjobsCountHeader}>
        <div># of students applied</div>
        <div># of applicant slots available</div>
      </div>
      <div className={applicantsjobsCount}>
        <div>{numApplicants}</div>
        <div className={divide}>{" / "}</div>
        <div>{maxApplicants}</div>
      </div>
    </div>
  )
}






