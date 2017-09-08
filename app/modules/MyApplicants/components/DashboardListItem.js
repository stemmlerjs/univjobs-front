
/*
 * DashboardListItem
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import StateNodes from './StateNodes'

import { dashboardListItemContainer, infoSectionContainer, titleText, jobTypeText, stateSectionContainer, statesContainer,
  stateNodes, node, line, nodeCounts, nodeCountSection, nodeTypeName, nodeValue, appRelativeStyle,
  button, node1, node2, node3 } from '../styles/DashboardListItemStyles.css'

import { Link } from 'react-router'

export default function DashboardListItem ({ job, index, handleChangeSelectedJob }) {
  console.log("this is the job", job)
  return (
    <div className={dashboardListItemContainer}>
      <div className={infoSectionContainer}>
        <div className={titleText}>{job.title}</div>
        <div className={jobTypeText}>Part-time</div>
        <div>
          <Link onClick={() => {
            handleChangeSelectedJob(job)
          }} to={`/myapplicants/new/${job.job_id}`}>
            <button className={button}>View Applicants</button>
          </Link>
          <Link to={`/mypostings/open/${job.job_id}`}>
            <button className={button}><i data-tip={'View in My Postings'} className={"fa fa-file-text"} aria-hidden="true"></i></button>
          </Link>
        </div>

      </div>
      <div className={stateSectionContainer}>
          <StateNodes 
            job={job}
            initialApplicants={job.applicants_INITIAL} 
            pooledApplicants={job.applicants_POOLED} 
            hiredApplicants={job.applicants_HIRED}
            handleChangeSelectedJob={handleChangeSelectedJob}
            page={"applicants-dash"}
          />
      </div>
    </div>
  )
}


