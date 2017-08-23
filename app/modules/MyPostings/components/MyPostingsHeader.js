
/*
 * MyPostingsHeader
 * 
 * This small component is the Header on the My Postings pages.
 * It's resuable and each component uses it to render slightly different.
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { headerSection, headerJobTitle, headerJobsSelectionContainer,
  headerNumberJobs, headerJobSelectButton } from '../styles/MyPostingsStyles.css'

import JobsSelectDropdown from './JobsSelectDropdown'

export default function MyPostingsHeader ({ page, jobs }) {

  if (page === "postings-open") {
    return (
      <div className={headerSection}>
        <div className={headerJobTitle}>Marketing Street Team</div>
        <div className={headerJobsSelectionContainer}>
          <div className={headerNumberJobs}>{jobs.length === 0 ? '0 open jobs' : jobs.length + " open jobs"}</div>
          <div className={headerJobSelectButton}>
            <ReactTooltip delayHide={100} delayShow={20} place="right" effect="float"/>
            <i data-tip={`Select a job to display`} className={"fa fa-angle-down"} aria-hidden="true"></i>
          </div>
          <JobsSelectDropdown jobs={jobs} visible={true}/>
        </div>
      </div>
    )
  }

  else if (page === "postings-closed") {
    return (
      <div className={headerSection}>
        <div className={headerJobTitle}>Marketing Street Team</div>
        <div className={headerJobsSelectionContainer}>
          <div className={headerNumberJobs}>{jobs.length === 0 ? '0 closed jobs' : jobs.length + " closed jobs"}</div>
          <div className={headerJobSelectButton}>
            <ReactTooltip delayHide={100} delayShow={20} place="right" effect="float"/>
            <i data-tip={`Select a job to display`} className={"fa fa-angle-down"} aria-hidden="true"></i>
          </div>
          <JobsSelectDropdown jobs={jobs} visible={true}/>
        </div>
      </div>
    )
  }

  else {
    return (
      <div className={headerSection}>
        <div className={headerJobTitle}>Marketing Street Team</div>
        <div className={headerJobsSelectionContainer}>
          <div className={headerNumberJobs}>{jobs.length === 0 ? '0 jobs waiting approval' : jobs.length + " jobs waiting approval"}</div>
          <div className={headerJobSelectButton}>
            <ReactTooltip delayHide={100} delayShow={20} place="right" effect="float"/>
            <i data-tip={`Select a job to display`} className={"fa fa-angle-down"} aria-hidden="true"></i>
          </div>
          <JobsSelectDropdown jobs={jobs} visible={true}/>
        </div>
      </div>
    )
  }

  
}


