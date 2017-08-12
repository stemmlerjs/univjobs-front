
import React, { PropTypes } from 'react'

import { mobileStudentProfileBreadCrumbsContainer, node, line, completedNode, uncompletedNode,
    completedLine, incompleteLine } from '../styles/MobileStudentProfileBreadCrumbs.css'

export default function MobileStudentProfileBreadCrumbs ({ totalStates, currentState }) {

  const completedNodes = Array.apply(null, Array(currentState - 1)).map(Number.prototype.valueOf,0)
  const incompleteNodes = Array.apply(null, Array(totalStates - completedNodes.length - 1)).map(Number.prototype.valueOf,0)

  return (
    <div className={mobileStudentProfileBreadCrumbsContainer}>
      {
        completedNodes.map((el, index) => {
          return <div key={`${index}-completed`} className={completedNode}><i className={`fa fa-check`} aria-hidden="true"></i></div>
        })
      }

      {
        incompleteNodes.map((el, index) => {
          return <div key={`${index}-incomplete`} className={uncompletedNode}></div>
        })
      }
    </div>
  )
}
