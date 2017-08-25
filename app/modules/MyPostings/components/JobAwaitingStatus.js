

import React, { PropTypes } from 'react'
import { container } from '../styles/JobQuestionsStyles.css'

import { altBox, twenty } from '../styles/MyPostingsStyles.css'

import { applicantsjobsCountHeader, applicantsjobsCount, divide } from '../styles/JobApplicantsSummaryStyles.css'

export default function JobAwaitingStatus ({ }) {

  return (
    <div className={altBox}>
      <div className={applicantsjobsCount}>
        <div className={twenty}>AWAITING APPROVAL</div>
      </div>
    </div>
  )
}






