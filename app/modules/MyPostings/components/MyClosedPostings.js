
import React, { PropTypes } from 'react'
import { rootSidebarOpenComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import JobDetails from './JobDetails'
import JobQuestions from './JobQuestions'
import JobApplicantsSummary from './JobApplicantsSummary'
import JobInvitations from './JobInvitations'
import JobMetrics from './JobMetrics'
import JobSettings from './JobSettings'
import MyPostingsHeader from './MyPostingsHeader'
import JobPostingsListView from './JobPostingsListView'

import { bodySection, bodySectionColumn,  linkStyle,
  sectionContainer, sectionTitle, standardButton, bodySectionNoJobs, standardButtonInactive,
  sectionContainerHeader, sectionTitleAlt, box, altBox } from '../styles/MyPostingsStyles.css'


const JobDetailsSectionMyPostingsClosed = ({job}) => {
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitle}>Details</div>
        <div>
          <button className={standardButtonInactive}>Repost Job</button>
        </div>
      </div>
      <JobDetails
        jobTitle={job.title}
        desiredSkills={job.desired_skills}
        location={job.location}
        qualifications={job.qualification}
        remoteWork={job.remote_work}
        responsibilities={job.responsibilities}
        startDate={job.start_date}
        createdAt={job.createdAt}
        updatedAt={job.updatedAt}
        paid={job.paid}
        compensation={job.compensation}
        jobType={job.type}/>
    </div>
  )
}

const JobQuestionSectionMyPostingsClosed = ({ questions }) => {
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitle}>Questions</div>
      </div>
      <JobQuestions questions={questions}/>
    </div>
  )
}

const JobMetricsSectionMyPostingsClosed = () => {
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitle}>Metrics</div>
      </div>
      <JobMetrics/>
    </div>
  )
}


export default function MyClosedPostings ({ 
    jobs, 
    jobSelectDropdownIsOpen,
    selectedJob,
    
    handleOpenJobSelect,
    handleChangeSelectedJob
 }) {

    return (
      <div className={rootSidebarOpenComponentContainer}>

        {/* My Postings Header */}
        <MyPostingsHeader 
          page={"postings-closed"} 
          jobs={jobs}
          jobSelectDropdownIsOpen={jobSelectDropdownIsOpen}
          handleOpenJobSelect={handleOpenJobSelect} 
          handleChangeSelectedJob={handleChangeSelectedJob}
          selectedJob={selectedJob}
        />
        
        {
          /*
           * When no job is selected, 
           */

          selectedJob.job_id == undefined 
            ? jobs.length === 0 
              ? <div className={bodySectionNoJobs}>You don't currently have any closed jobs.</div>
              : <div className={bodySectionNoJobs}>
                  <div>Select a job to see a detailed breakdown.</div>
                  <JobPostingsListView jobs={jobs} page={"closed"} handleChangeSelectedJob={handleChangeSelectedJob}/>
                </div>
            : jobs.length === 0
              ? <div className={bodySectionNoJobs}>You don't currently have any closed jobs.</div>
              : <div className={bodySection}>

                {
                  /*
                  * =====================
                  * ======= LEFT ========
                  * =====================
                  */
                }

                <div className={bodySectionColumn}>
                  <JobDetailsSectionMyPostingsClosed job={selectedJob}/>
                  <JobQuestionSectionMyPostingsClosed questions={selectedJob.questions}/>
                </div>

                {
                  /*
                  * =====================
                  * ====== RIGHT ========
                  * =====================
                  */
                }

                <div className={bodySectionColumn}>
                  <JobMetricsSectionMyPostingsClosed/>
                </div>

          </div>
        }

      </div>
    )
}


