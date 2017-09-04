

/*
 * ApplicantSidebar
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { applicantSidebarContainer, hide } from '../styles/ApplicantSidebarStyles.css'

export default function ApplicantSidebar ({ isOpen, selectedApplicant }) {
  return (
    <div className={isOpen ? applicantSidebarContainer : `${applicantSidebarContainer} ${hide}`}>
      kjhasdjkh
    </div>
  )
}
