
/*
 * DashboardListItem
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { dashboardListItemContainer, infoSectionContainer, titleText, jobTypeText, stateSectionContainer, statesContainer,
  stateNodes, node, line, nodeCounts, nodeCountSection, nodeTypeName, nodeValue, appRelativeStyle,
  button, node1, node2, node3, contactRelativeStyle, currentPageText } from '../styles/DashboardListItemStyles.css'

import { bounce } from '../styles/StateNodeStyles.css'

import { Link } from 'react-router'

import { attrExists } from 'helpers/utils'

export default function StateNodes ({ 
  initialApplicants, 
  pooledApplicants, 
  hiredApplicants, 
  handleChangeSelectedJob, 
  job, 
  page,
  
  isContactingApplicantsSuccess,
  isHiringApplicantsSuccess
}) {
  console.log("page", page)

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
            <div data-tip={'Review all contacted applicants in your potential hires pool'} 
              className={isContactingApplicantsSuccess ? `${node} ${node2} ${bounce}` : `${node} ${node2}`}></div>
          </Link>
          <div className={line}></div>
          <Link onClick={() => {
            handleChangeSelectedJob(job)
          }} to={`/myapplicants/hired/${attrExists(job) ? job.job_id : ''}`}>
            <div data-tip={'Review all your hired applicants'} 
              className={isHiringApplicantsSuccess ? `${node} ${node3} ${bounce}` : `${node} ${node3}`}></div>
          </Link>
        </div>

      <div className={nodeCounts}>
        <div className={`${nodeCountSection} ${appRelativeStyle}`}>
          <div className={page == "applicants-new" ? `${nodeTypeName} ${currentPageText}` : nodeTypeName}>New</div>
          <div className={page == "applicants-new" ? `${nodeValue} ${currentPageText}` : nodeValue}>{initialApplicants ? initialApplicants.length : 0}</div>
        </div>
        <div className={`${nodeCountSection} ${contactRelativeStyle}`}>
          <div className={page == "applicants-pool" ? `${nodeTypeName} ${currentPageText}` : nodeTypeName}>Contacted</div>
          <div className={page == "applicants-pool" ? `${nodeValue} ${currentPageText}` : nodeValue}>{pooledApplicants ? pooledApplicants.length : 0}</div>
        </div>
        <div className={nodeCountSection}>
          <div className={page == "applicants-hired" ? `${nodeTypeName} ${currentPageText}` : nodeTypeName}>Hired</div>
          <div className={page == "applicants-hired" ? `${nodeValue} ${currentPageText}` : nodeValue}>{hiredApplicants ? hiredApplicants.length : 0}</div>
        </div>
      </div>
    </div>
  )
}


