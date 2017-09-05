
/*
 * MyApplicantsSubNavbar.js
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'


import { subNavbarContainer, active } from '../styles/MyApplicantsSubNavbarStyles.css'
import { standardButton, standardButtonRed, standardButtonNeutral } from '../styles/MyApplicantsStyles.css'

import { Link } from 'react-router'

export default function MyApplicantsSubNavbar ({ 
  handleMultiSelectDeselectAll,
  handleMultiSelectAll,
  multiSelectViewActive,
  handleMultiSelectRejectApplicants,
  handleMultiSelectAdvanceApplicants
}) {
  return (
    <div className={multiSelectViewActive ? `${subNavbarContainer} ${active}` : subNavbarContainer}>
      <button className={standardButtonNeutral} onClick={handleMultiSelectAll}>Select All</button>
      <button className={standardButtonNeutral} onClick={handleMultiSelectDeselectAll}>Deselect All</button>
      <button className={standardButton} onClick={handleMultiSelectAdvanceApplicants}>Contact Student(s)</button>
      <button className={standardButtonRed} onClick={handleMultiSelectRejectApplicants}>Reject Student(s)</button>
    </div>
  )
}


