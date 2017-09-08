
/*
 * MyApplicantsSubNavbar.js
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'


import { subNavbarContainer, invisibleSubNavbarContainer, active, numSelectedApplicants } from '../styles/MyApplicantsSubNavbarStyles.css'
import { standardButton, standardButtonRed, standardButtonNeutral } from '../styles/MyApplicantsStyles.css'

import { Link } from 'react-router'

export default function MyApplicantsSubNavbar ({ 
  handleMultiSelectDeselectAll,
  handleMultiSelectAll,
  multiSelectViewActive,
  multiSelectedApplicantIds,
  handleMultiSelectRejectApplicants,
  handleMultiSelectAdvanceApplicants,
  handleMultiSelectHireApplicants,
  page
}) {

  if (page == "applicants-new") {
    return (
      <div className={multiSelectViewActive ? `${subNavbarContainer} ${active}` : subNavbarContainer}>
        <button className={standardButtonNeutral} onClick={handleMultiSelectAll}>Select All</button>
        <button className={standardButtonNeutral} onClick={handleMultiSelectDeselectAll}>Deselect All</button>
        <button className={standardButton} onClick={handleMultiSelectAdvanceApplicants}>Contact Student(s)</button>
        <button className={standardButtonRed} onClick={handleMultiSelectRejectApplicants}>Reject Student(s)</button>
        <div className={numSelectedApplicants}>{multiSelectedApplicantIds.length == 1 ? "1 applicant selected" : `${multiSelectedApplicantIds.length} applicants selected`}</div>
      </div>
    )
  } 

  else if (page == "applicants-pool") {
    return (
      <div className={multiSelectViewActive ? `${subNavbarContainer} ${active}` : subNavbarContainer}>
        <button className={standardButtonNeutral} onClick={handleMultiSelectAll}>Select All</button>
        <button className={standardButtonNeutral} onClick={handleMultiSelectDeselectAll}>Deselect All</button>
        <button className={standardButton} onClick={handleMultiSelectHireApplicants}>Hire Student(s)</button>
        <button className={standardButtonRed} onClick={handleMultiSelectRejectApplicants}>Reject Student(s)</button>
        <div className={numSelectedApplicants}>{multiSelectedApplicantIds.length == 1 ? "1 applicant selected" : `${multiSelectedApplicantIds.length} applicants selected`}</div>
      </div>
    )
  }

  else {
    return (
      <div className={invisibleSubNavbarContainer}></div>
    )
  }
  
}


