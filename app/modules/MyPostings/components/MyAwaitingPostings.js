
import React, { PropTypes } from 'react'
import { rootSidebarOpenComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import JobDetails from './JobDetails'
import JobQuestions from './JobQuestions'
import JobApplicantsSummary from './JobApplicantsSummary'
import JobInvitations from './JobInvitations'
import JobMetrics from './JobMetrics'
import JobSettings from './JobSettings'
import MyPostingsHeader from './MyPostingsHeader'

import { bodySection, bodySectionColumn, linkStyle,
  sectionContainer, sectionTitle, standardButton, bodySectionNoJobs,
  sectionContainerHeader, sectionTitleAlt, box, altBox } from '../styles/MyPostingsStyles.css'

export default function MyAwaitingPostings ({ jobs }) {

    return (
      <div className={rootSidebarOpenComponentContainer}>

        {/* My Postings Header */}
        <MyPostingsHeader page={"postings-approval"} jobs={jobs} />
        
        {
          jobs.length === 0
            ? <div className={bodySectionNoJobs}>You don't have any jobs awaiting approval.</div>
            : <div className={bodySection}>

                {
                  /*
                  * =====================
                  * ======= LEFT ========
                  * =====================
                  */
                }

                <div className={bodySectionColumn}>


                  {/* Job Details */}
                  <div className={sectionContainer}>
                    <div className={sectionContainerHeader}>
                      <div className={sectionTitle}>Details</div>
                      <div>
                        <button className={standardButton}><i className={"fa fa-pencil-square-o"} aria-hidden="true"></i></button>
                        <button className={standardButton}>View Public Posting</button>
                      </div>
                    </div>
                    <JobDetails/>
                  </div>

                  {/* Questions */}
                  <div className={sectionContainer}>
                    <div className={sectionContainerHeader}>
                      <div className={sectionTitle}>Questions</div>
                      <div>
                        <button className={standardButton}><i className={"fa fa-pencil-square-o"} aria-hidden="true"></i></button>
                      </div>
                    </div>
                    <JobQuestions questions={[{
                      text: 'What is your favourite thing to do?'
                    }, {
                      text: 'What is your second favourite thing to do?'
                    }]}/>
                  </div>

                </div>

                {
                  /*
                  * =====================
                  * ====== RIGHT ========
                  * =====================
                  */
                }

                <div className={bodySectionColumn}>

                  {
                    /* ================================
                    * SETTINGS
                    * ================================
                    */
                  }

                  <div className={sectionContainer}>
                    <div className={sectionContainerHeader}>
                      <div className={sectionTitle}>Settings</div>
                    </div>
                    <JobSettings notificationSettings={{
                      onApply: true
                    }}/>
                  </div>

                </div>

              </div>
        }
          
      </div>
    )
}


