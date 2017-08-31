
/*
 * MyApplicantsHeader
 * 
 * This small component is the Header on the My Applicants pages.
 * It's resuable and each component uses it to render slightly different.
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { headerSection, headerJobTitle, headerJobsSelectionContainer,
  headerNumberJobs, headerJobSelectButton } from 'modules/MyPostings/styles/MyPostingsStyles.css'

import { subTitle } from '../styles/MyApplicantsHeaderStyles.css'

import JobsSelectDropdown from 'modules/MyPostings/components/JobsSelectDropdown'

export default function MyApplicantsHeader ({ jobs, jobSelectDropdownIsOpen, handleOpenJobSelect, handleChangeSelectedJob, selectedJob }) {
  return (
    <div className={headerSection}>
      {
        selectedJob.title
          ? <div className={headerJobTitle}>{selectedJob.title}</div>
          : <div className={headerJobTitle}>My Applicants<span className={subTitle}>Hire students that've applied to your postings</span></div>
      }
      
      <div className={headerJobsSelectionContainer}>
        <div className={headerNumberJobs}>{jobs.length === 0 ? '0 jobs' : jobs.length + " jobs"}</div>
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


