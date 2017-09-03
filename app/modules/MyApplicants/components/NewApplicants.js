
/*
 * DashboardListItem
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'
import MyApplicantsHeader from './MyApplicantsHeader'

import { rootComponentContainer } from 'sharedStyles/sharedComponentStyles.css'

import {  } from '../styles/NewApplicantsStyles.css'

import { Link } from 'react-router'

export default function NewApplicants ({ jobs, selectedJob }) {
  return (
    <div className={rootComponentContainer}>
      <MyApplicantsHeader jobs={jobs} selectedJob={selectedJob}/>

      new apps and shit
    </div>
  )
}


