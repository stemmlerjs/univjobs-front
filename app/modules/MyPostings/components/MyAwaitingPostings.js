
import React, { PropTypes } from 'react'
import { rootSidebarOpenComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import JobDetails from './JobDetails'
import JobQuestions from './JobQuestions'
import JobApplicantsSummary from './JobApplicantsSummary'
import JobInvitations from './JobInvitations'
import JobMetrics from './JobMetrics'
import JobSettings from './JobSettings'
import MyPostingsHeader from './MyPostingsHeader'
import JobAwaitingStatus from './JobAwaitingStatus'
import JobPostingsListView from './JobPostingsListView'

import { Link } from 'react-router'

import { bodySection, bodySectionColumn, linkStyle,
  sectionContainer, sectionTitle, standardButton, bodySectionNoJobs, standardButtonRed,
  sectionContainerHeader, sectionTitleAlt, box, altBox } from '../styles/MyPostingsStyles.css'

export default function MyAwaitingPostings ({ 
    jobs, 
    selectedJob, 
    jobSelectDropdownIsOpen,

    handleOpenJobSelect,
    handleChangeSelectedJob
 }) {

    const JobDetailsSectionMyPostingsAwaiting = ({job}) => {
      return (
        <div className={sectionContainer}>
          <div className={sectionContainerHeader}>
            <div className={sectionTitle}>Details</div>
            <div>
              <button className={standardButton}><i className={"fa fa-pencil-square-o"} aria-hidden="true"></i></button>
              <button className={standardButtonRed}><i className={"fa fa-times"} aria-hidden="true"></i></button>
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
            jobType={job.type}
          />
        </div>
      )
    }

    const JobQuestionSectionMyPostingsAwaiting = ({ questions }) => {
      return (
        <div className={sectionContainer}>
          <div className={sectionContainerHeader}>
            <div className={sectionTitle}>Questions</div>
            <div>
              <button className={standardButton}><i className={"fa fa-pencil-square-o"} aria-hidden="true"></i></button>
            </div>
          </div>
          <JobQuestions questions={questions}/>
        </div>
      )
    }

    const JobSettingsSectionMyPostingsAwaiting = () => {
      return (
        <div className={sectionContainer}>
          <div className={sectionContainerHeader}>
            <div className={sectionTitle}>Settings</div>
          </div>
          <JobSettings notificationSettings={{
            onApply: true
          }}/>
        </div>
      )
    }

    const JobStatusMyPostingsAwaiting = () => {
      return (
        <div className={sectionContainer}>
          <div className={sectionContainerHeader}>
            <div className={sectionTitleAlt}>STATUS</div>
          </div>
          <JobAwaitingStatus/>
        </div>
      )
    }

    return (
      <div className={rootSidebarOpenComponentContainer}>

        {/* My Postings Header */}
        <MyPostingsHeader 
          page={"postings-approval"} 
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
              ? <div className={bodySectionNoJobs}>You don't have any jobs awaiting approval. <Link className={linkStyle} to="/categories">Post a new job</Link> and we'll let you know when it's approved!</div>
              : <div className={bodySectionNoJobs}>
                  <div>Select a job from the dropdown above to see a detailed breakdown.</div>
                  <JobPostingsListView jobs={jobs} page={"awaiting"} handleChangeSelectedJob={handleChangeSelectedJob}/>
                </div>
            : jobs.length === 0
              ? <div className={bodySectionNoJobs}>You don't have any jobs awaiting approval. <Link className={linkStyle} to="/categories">Post a new job</Link> and we'll let you know when it's approved!</div>
              : <div className={bodySection}>

                 {
                  /*
                    * =====================
                    * ======= LEFT ========
                    * =====================
                    *
                    * - Job Details
                    * - Job Questions
                    */
                  }

                <div className={bodySectionColumn}>
                  <JobDetailsSectionMyPostingsAwaiting job={selectedJob}/>
                  <JobQuestionSectionMyPostingsAwaiting questions={selectedJob.questions}/>
                </div>

                {
                  /*
                  * =====================
                  * ====== RIGHT ========
                  * =====================
                  *
                  * - Settings
                  */
                }
                  
                <div className={bodySectionColumn}>
                  <JobStatusMyPostingsAwaiting/>
                  <JobSettingsSectionMyPostingsAwaiting/>
                </div>

              </div>
        }
          
      </div>
    )
}


