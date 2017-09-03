
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

export default function DashboardListItem ({ job, index }) {
  return (
    <div className={dashboardListItemContainer}>
      <div className={infoSectionContainer}>
        <div className={titleText}>{job.title}</div>
        <div className={jobTypeText}>Part-time</div>
        <div>
          <Link to={`/myapplicants/new/${job.job_id}`}>
            <button className={button}>View Applicants</button>
          </Link>
          <Link to={`/mypostings/open/${job.job_id}`}>
            <button className={button}><i  className={"fa fa-pencil-square-o"} aria-hidden="true"></i></button>
          </Link>
        </div>

      </div>
      <div className={stateSectionContainer}>
        <div className={statesContainer}>

          <div className={stateNodes}>
            <div className={`${node} ${node1}`}></div>
            <div className={line}></div>
            <div className={`${node} ${node2}`}></div>
            <div className={line}></div>
            <div className={`${node} ${node3}`}></div>
          </div>

          <div className={nodeCounts}>
            <div className={`${nodeCountSection} ${appRelativeStyle}`}>
              <div className={nodeTypeName}>New</div>
              <div className={nodeValue}>3</div>
            </div>
            <div className={nodeCountSection}>
              <div className={nodeTypeName}>Pool</div>
              <div className={nodeValue}>6</div>
            </div>
            <div className={nodeCountSection}>
              <div className={nodeTypeName}>Hired</div>
              <div className={nodeValue}>1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


