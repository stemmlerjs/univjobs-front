
/*
 * DashboardListItem
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { dashboardListItemContainer, infoSectionContainer, titleText, jobTypeText, stateSectionContainer, statesContainer,
  stateNodes, node, line, nodeCounts, nodeCountSection, nodeTypeName, nodeValue, appRelativeStyle,
  button, node1, node2, node3, contactRelativeStyle } from '../styles/DashboardListItemStyles.css'

import { Link } from 'react-router'

import { attrExists } from 'helpers/utils'

export default function StateNodes ({ initialApplicants, pooledApplicants, hiredApplicants, handleChangeSelectedJob, job, page }) {
  console.log("State node job", job)
  return (
    <div className={statesContainer}>
      <ReactTooltip delayHide={100} delayShow={20} place="top" effect="float"/>
        <div className={stateNodes}>
          <Link onClick={() => {
            handleChangeSelectedJob(job)
          }} to={`/myapplicants/new/${attrExists(job) ? job.job_id : ''}`}>
            <div data-tip={'Review all new applicants'} className={`${node} ${node1}`}></div>
          </Link>
          <div className={line}></div>
          <Link onClick={() => {
            handleChangeSelectedJob(job)
          }} to={`/myapplicants/pool/${attrExists(job) ? job.job_id : ''}`}>
            <div data-tip={'Review all contacted applicants in your potential hires pool'} className={`${node} ${node2}`}></div>
          </Link>
          <div className={line}></div>
          <Link onClick={() => {
            handleChangeSelectedJob(job)
          }} to={`/myapplicants/hired/${attrExists(job) ? job.job_id : ''}`}>
            <div data-tip={'Review all your hired applicants'} className={`${node} ${node3}`}></div>
          </Link>
        </div>

      <div className={nodeCounts}>
        <div className={`${nodeCountSection} ${appRelativeStyle}`}>
          <div className={nodeTypeName}>New</div>
          <div className={nodeValue}>{initialApplicants ? initialApplicants.length : 0}</div>
        </div>
        <div className={`${nodeCountSection} ${contactRelativeStyle}`}>
          <div className={nodeTypeName}>Contacted</div>
          <div className={nodeValue}>{pooledApplicants ? pooledApplicants.length : 0}</div>
        </div>
        <div className={nodeCountSection}>
          <div className={nodeTypeName}>Hired</div>
          <div className={nodeValue}>{hiredApplicants ? hiredApplicants.length : 0}</div>
        </div>
      </div>
    </div>
  )
}


