
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

import ReactTooltip from 'react-tooltip'

import { Link } from 'react-router'

import { bodySection, bodySectionNoJobs, bodySectionColumn,
  linkStyle,
  sectionContainer, sectionTitle, standardButton, standardButtonRed, standardButtonInactive,
  sectionContainerHeader, sectionTitleAlt, box, altBox, white,
  bodySectionInnerMapRender, displayNone, inlineBlock } from '../styles/MyPostingsStyles.css'

/*
  * All of the job details and stuff.
  */

const JobDetailsSectionMyPostingsOpen = ({ job, 
  editViewEnabled,
  wereJobDetailsEditsMade,
  isSavingChanges,
  jobDetailsPropsErrorMap,

  handleCloseJob, 
  handleSaveJobDetailsEdits, 
  handleEnterEditJobDetailsView, 
  handleUpdateJobDetailsField, 
  handleCancelJobDetailsEdits }) => {
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitle}>Details</div>
        <div>
          <Link to={`/posting/${job.job_id}`}>
            <button className={editViewEnabled ? displayNone : standardButton}>View Public Posting</button>
          </Link>

          {
            job.applicants.length == 0
              ? <div className={inlineBlock}>
                  {
                    !editViewEnabled
                      ? <button data-tip={'Edit job'} onClick={() => {
                            handleEnterEditJobDetailsView('open')
                          }} className={standardButton}>
                          <i  className={"fa fa-pencil-square-o"} aria-hidden="true"></i>
                        </button>
                      : <button data-tip={'Cancel editing'} onClick={handleCancelJobDetailsEdits} className={standardButtonRed}>
                          Cancel
                        </button>
                  }
                </div>
              : <button data-tip={'Edit job - unavailable after students have applied.'} className={standardButtonInactive}>
                  <i  className={"fa fa-pencil-square-o"} aria-hidden="true"></i>
                </button>
          }
          
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
        page={'open'}
      />
    </div>
  )
}

/*
  * All of the questions for this job.
  */

const JobQuestionSectionMyPostingsOpen = ({ questions, numApplicants }) => { 
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitle}>Questions</div>
        <div>
          {
            numApplicants == 0
              ? <button data-tip={'Edit questions'} className={standardButtonInactive}>
                  <i className={"fa fa-pencil-square-o"} aria-hidden="true"></i>
                </button>
              : <button data-tip={'Edit questions - unavailable after students have applied.'} className={standardButtonInactive}>
                  <i className={"fa fa-pencil-square-o"} aria-hidden="true"></i>
                </button>
          }
        </div>
      </div>
      <JobQuestions questions={questions}/>
    </div>
  )
}



const JobApplicantsSummarySectionMyPostingsOpen = ({ maxApplicants, numApplicants, jobId }) => {
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitleAlt}>APPLICANTS</div>
        <div>
          <button className={standardButton}>
            <Link to={`/myapplicants/new/${jobId}`} className={white}>Go to applicants</Link>
          </button>
        </div>
      </div>
      <JobApplicantsSummary maxApplicants={maxApplicants} numApplicants={numApplicants}/>
    </div>
  )
}

const JobNumPositionsSectionMyPostingsOpen = ({ hiredApplicants, numPositions }) => {
  console.log("This job has applicants", hiredApplicants)
  console.log("This job has max positinos", numPositions)
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitleAlt}># OF POSITIONS</div>
      </div>
      <div className={box}>
        {
          numPositions == 1
            ? hiredApplicants.length == 0
              ? `This job has 1 position. It has not yet been filled.`
              : `This single job position has been fulfilled.`
            : numPositions == hiredApplicants.length 
              ? `This job has filled all ${numPositions}.`
              : `This job has a total ${numPositions} of positions, ${hiredApplicants.length} of which are currently filled.`
        }
      </div>
    </div>
  )
}

const JobInvitationsSectionMyPostingsOpen = ({invitedStudents}) => {
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitle}>Invitations</div>
      </div>
      <JobInvitations students={invitedStudents}/>
    </div>
  )
}

const JobMetricsSectionMyPostingsOpen = () => {
  return (
    <div className={sectionContainer}>
      <div className={sectionContainerHeader}>
        <div className={sectionTitle}>Metrics</div>
      </div>
      <JobMetrics/>
    </div>
  )
}

const JobSettingsSectionMyPostingsOpen = () => {
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

export default function MyPostings ({ 
    jobs, 
    selectedJob, 
    selectedOpenJobInvites,
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
          page={"postings-open"} 
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
              ? <div className={bodySectionNoJobs}>You don't have any open jobs yet. <Link className={linkStyle} to="/categories">Post a job</Link> and we'll let you know when it's approved!</div>
              : <div className={bodySectionNoJobs}>
                  <div>Select a job to see a detailed breakdown.</div>
                  <JobPostingsListView jobs={jobs} page={"open"} handleChangeSelectedJob={handleChangeSelectedJob}/>
                </div>
            : jobs.length === 0
              ? <div className={bodySectionNoJobs}>You don't have any open jobs yet. <Link className={linkStyle} to="/categories">Post a job</Link> and we'll let you know when it's approved!</div>
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
                      <JobDetailsSectionMyPostingsOpen 
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
                      <JobQuestionSectionMyPostingsOpen questions={selectedJob.questions} numApplicants={selectedJob.applicants.length}/>
                    </div>

                    {
                    /*
                      * =====================
                      * ====== RIGHT ========
                      * =====================
                      *
                      * - Applicants
                      * - # Positions
                      * - Invitations
                      * - Metrics
                      * - Settings
                      */
                    }

                    <div className={bodySectionColumn}>
                      <JobApplicantsSummarySectionMyPostingsOpen jobId={selectedJob.job_id} maxApplicants={selectedJob.max_applicants} numApplicants={selectedJob.applicants.length}/>
                      <JobNumPositionsSectionMyPostingsOpen 
                        hiredApplicants={selectedJob.applicants_HIRED ? selectedJob.applicants_HIRED : 0} 
                        numPositions={selectedJob.num_positions}
                      />
                      <JobInvitationsSectionMyPostingsOpen invitedStudents={selectedOpenJobInvites}/>
                      <JobMetricsSectionMyPostingsOpen/>
                      <JobSettingsSectionMyPostingsOpen/>
                    </div>

            </div>
        }
      </div>
    )
}


