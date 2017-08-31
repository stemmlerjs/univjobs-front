
/*
 * DashboardListItem
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { dashboardListItemContainer, infoSectionContainer, titleText, jobTypeText, stateSectionContainer, statesContainer,
  stateNodes, node, line, nodeCounts, nodeCountSection, nodeTypeName, nodeValue } from '../styles/DashboardListItemStyles.css'

export default function DashboardListItem ({ job, index }) {
  return (
    <div className={dashboardListItemContainer}>
      <div className={infoSectionContainer}>
        <div className={titleText}>{job.title}</div>
        <div className={jobTypeText}>Part-time</div>
        <div>

        </div>

      </div>
      <div className={stateSectionContainer}>
        <div className={statesContainer}>

          <div className={stateNodes}>
            <div className={node}></div>
            <div className={line}></div>
            <div className={node}></div>
            <div className={line}></div>
            <div className={node}></div>
          </div>

          <div className={nodeCounts}>
            <div className={nodeCountSection}>
              <div className={nodeTypeName}>New Apps</div>
              <div className={nodeValue}>3</div>
            </div>
            <div className={nodeCountSection}>
              <div className={nodeTypeName}>Contact Pool</div>
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


