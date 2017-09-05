
/*
 * DashboardListItem
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

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
        <div className={statesContainer}>
          <ReactTooltip delayHide={100} delayShow={20} place="top" effect="float"/>
          <div className={stateNodes}>
            <Link onClick={() => {
              handleChangeSelectedJob(job)
            }} to={`/myapplicants/new/${job.job_id}`}>
              <div data-tip={'Review all new applicants'} className={`${node} ${node1}`}></div>
            </Link>
            <div className={line}></div>
            <Link to={`/myapplicants/pool/${job.job_id}`}>
              <div data-tip={'Review all applicants in your potential hires pool'} className={`${node} ${node2}`}></div>
            </Link>
            <div className={line}></div>
            <Link to={`/myapplicants/hired/${job.job_id}`}>
              <div data-tip={'Review all your hired applicants'} className={`${node} ${node3}`}></div>
            </Link>
          </div>

          <div className={nodeCounts}>
            <div className={`${nodeCountSection} ${appRelativeStyle}`}>
              <div className={nodeTypeName}>New</div>
              <div className={nodeValue}>{job.applicants_INITIAL ? job.applicants_INITIAL.length : 0}</div>
            </div>
            <div className={nodeCountSection}>
              <div className={nodeTypeName}>Pool</div>
              <div className={nodeValue}>{job.applicants_POOLED ? job.applicants_POOLED.length : 0}</div>
            </div>
            <div className={nodeCountSection}>
              <div className={nodeTypeName}>Hired</div>
              <div className={nodeValue}>{job.applicants_HIRED ? job.applicants_HIRED.length : 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


