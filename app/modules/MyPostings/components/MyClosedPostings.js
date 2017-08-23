
import React, { PropTypes } from 'react'
import { rootSidebarOpenComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import JobDetails from './JobDetails'
import JobQuestions from './JobQuestions'
import JobApplicantsSummary from './JobApplicantsSummary'
import JobInvitations from './JobInvitations'
import JobMetrics from './JobMetrics'
import JobSettings from './JobSettings'
import MyPostingsHeader from './MyPostingsHeader'

import { bodySection, bodySectionColumn,  linkStyle,
  sectionContainer, sectionTitle, standardButton, bodySectionNoJobs,
  sectionContainerHeader, sectionTitleAlt, box, altBox } from '../styles/MyPostingsStyles.css'

export default function MyClosedPostings ({ jobs }) {

    return (
      <div className={rootSidebarOpenComponentContainer}>

        {/* My Postings Header */}
        <MyPostingsHeader page={"postings-closed"} jobs={jobs} />
        
        {
          jobs.length === 0
            ? <div className={bodySectionNoJobs}>You don't have any closed jobs.</div>
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
                    <button className={standardButton}>Repost Job</button>
                  </div>
                </div>
                <JobDetails/>
              </div>

              {/* Questions */}
              <div className={sectionContainer}>
                <div className={sectionContainerHeader}>
                  <div className={sectionTitle}>Questions</div>
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
                * METRICS
                * ================================
                */
              }

              <div className={sectionContainer}>
                <div className={sectionContainerHeader}>
                  <div className={sectionTitle}>Stats</div>
                </div>
                <JobMetrics/>
              </div>

            </div>

          </div>
        }

      </div>
    )
}


