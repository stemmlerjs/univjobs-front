
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

export default function MyPostingsHeader ({ page, jobs, jobSelectDropdownIsOpen, handleOpenJobSelect, handleChangeSelectedJob, selectedJob }) {

  if (page === "postings-open") {
    return (
      <div className={headerSection}>
        <div className={headerJobTitle}>{selectedJob.title ? selectedJob.title : 'My Postings'}</div>
        <div className={headerJobsSelectionContainer}>
          <div className={headerNumberJobs}>{jobs.length === 0 
            ? '0 open jobs' 
            : jobs.length == 1
              ? '1 open job'
              : jobs.length + " open jobs"}</div>
          <div className={headerJobSelectButton} onClick={handleOpenJobSelect}>
            <i data-tip={`Select a job to display`} className={"fa fa-angle-down"} aria-hidden="true"></i>
          </div>
          <JobsSelectDropdown 
            currentJobId={selectedJob.job_id} 
            jobs={jobs} 
            visible={jobSelectDropdownIsOpen} 
            handleChangeSelectedJob={handleChangeSelectedJob}
          />
        </div>
      </div>
    )
  }

  else if (page === "postings-closed") {
    return (
      <div className={headerSection}>
        <div className={headerJobTitle}>{selectedJob.title ? selectedJob.title : 'My Postings'}</div>
        <div className={headerJobsSelectionContainer}>
          <div className={headerNumberJobs}>{jobs.length === 0 
            ? '0 closed jobs' 
            : jobs.length == 1
              ? '1 closed job'
              : jobs.length + " closed jobs"}</div>
          <div className={headerJobSelectButton} onClick={handleOpenJobSelect}>
            <i data-tip={`Select a job to display`} className={"fa fa-angle-down"} aria-hidden="true"></i>
          </div>
          <JobsSelectDropdown 
            currentJobId={selectedJob.job_id} 
            jobs={jobs} 
            visible={jobSelectDropdownIsOpen} 
            handleChangeSelectedJob={handleChangeSelectedJob}/>
        </div>
      </div>
    )
  }

  else {
    return (
      <div className={headerSection}>
        <div className={headerJobTitle}>{selectedJob.title ? selectedJob.title : 'My Postings'}</div>
        <div className={headerJobsSelectionContainer}>
          <div className={headerNumberJobs}>{jobs.length === 0 
            ? '0 jobs waiting approval' 
            : jobs.length == 1
              ? '1 job waiting for approval'
              : jobs.length + " jobs waiting approval"}</div>
          <div className={headerJobSelectButton} onClick={handleOpenJobSelect}>
            <i data-tip={`Select a job to display`} className={"fa fa-angle-down"} aria-hidden="true"></i>
          </div>
          <JobsSelectDropdown 
            currentJobId={selectedJob.job_id} 
            jobs={jobs} 
            visible={jobSelectDropdownIsOpen} 
            handleChangeSelectedJob={handleChangeSelectedJob}
          />
        </div>
      </div>
    )
  }

  
}


