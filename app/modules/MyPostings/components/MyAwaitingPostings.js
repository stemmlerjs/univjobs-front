
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

import ReactTooltip from 'react-tooltip'  

import { bodySection, bodySectionNoJobs, bodySectionColumn,
  linkStyle,
  sectionContainer, sectionTitle, standardButton, standardButtonRed, standardButtonInactive,
  sectionContainerHeader, sectionTitleAlt, box, altBox,
  bodySectionInnerMapRender, displayNone, inlineBlock } from '../styles/MyPostingsStyles.css'


  const JobDetailsSectionMyPostingsAwaiting = ({
    job, 
    editViewEnabled,
    wereJobDetailsEditsMade,
    isSavingChanges,
    jobDetailsPropsErrorMap,

    handleCloseJob, 
    handleSaveJobDetailsEdits, 
    handleEnterEditJobDetailsView, 
    handleUpdateJobDetailsField, 
    handleCancelJobDetailsEdits
  }) => {
    return (
      <div className={sectionContainer}>
        <div className={sectionContainerHeader}>
          <div className={sectionTitle}>Details</div>
          <div>
            <div className={inlineBlock}>
              {
                !editViewEnabled
                  ? <button data-tip={'Edit job'} onClick={() => {
                      handleEnterEditJobDetailsView('awaiting')
                    }} className={standardButton}>
                      <i  className={"fa fa-pencil-square-o"} aria-hidden="true"></i>
                    </button>
                  : <button data-tip={'Cancel editing'} onClick={handleCancelJobDetailsEdits} className={standardButtonRed}>
                      Cancel
                    </button>
              }
            </div>
            <button data-tip={'Close job'} onClick={() => handleCloseJob(job.job_id)} className={editViewEnabled ? displayNone : standardButtonRed}>
              <i className={"fa fa-times"} aria-hidden="true"></i>
            </button>
            <ReactTooltip delayHide={100} delayShow={20} place="bottom" effect="float"/>
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
          editViewEnabled={editViewEnabled}
          wereJobDetailsEditsMade={wereJobDetailsEditsMade}
          isSavingChanges={isSavingChanges}
          jobDetailsPropsErrorMap={jobDetailsPropsErrorMap}
          handleUpdateJobDetailsField={handleUpdateJobDetailsField}
          handleCancelJobDetailsEdits={handleCancelJobDetailsEdits}
          handleSaveJobDetailsEdits={handleSaveJobDetailsEdits}
          page={'awaiting'}
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
            <button className={standardButtonInactive}><i className={"fa fa-pencil-square-o"} aria-hidden="true"></i></button>
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

export default function MyAwaitingPostings ({ 
    jobs, 
    selectedJob, 
    jobSelectDropdownIsOpen,
    editViewEnabled,
    wereJobDetailsEditsMade,
    isSavingChanges,
    jobDetailsPropsErrorMap,

    handleOpenJobSelect,
    handleChangeSelectedJob,
    handleCloseJob,
    handleEnterEditJobDetailsView,
    handleUpdateJobDetailsField,
    handleCancelJobDetailsEdits,
    handleSaveJobDetailsEdits
 }) {
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
                  <div>Select a job to see a detailed breakdown.</div>
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
                  <JobDetailsSectionMyPostingsAwaiting 
                    job={selectedJob} 
                    isSavingChanges={isSavingChanges}
                    handleCloseJob={handleCloseJob} 
                    editViewEnabled={editViewEnabled}
                    jobDetailsPropsErrorMap={jobDetailsPropsErrorMap}
                    wereJobDetailsEditsMade={wereJobDetailsEditsMade}
                    handleEnterEditJobDetailsView={handleEnterEditJobDetailsView}
                    handleUpdateJobDetailsField={handleUpdateJobDetailsField}
                    handleCancelJobDetailsEdits={handleCancelJobDetailsEdits}
                    handleSaveJobDetailsEdits={handleSaveJobDetailsEdits}
                    />
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


