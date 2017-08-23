
import React, { PropTypes } from 'react'
import { rootSidebarOpenComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import JobDetails from './JobDetails'
import JobQuestions from './JobQuestions'
import JobApplicantsSummary from './JobApplicantsSummary'
import JobInvitations from './JobInvitations'
import JobMetrics from './JobMetrics'
import JobSettings from './JobSettings'
import MyPostingsHeader from './MyPostingsHeader'

import { Link } from 'react-router'

import { bodySection, bodySectionNoJobs, bodySectionColumn,
  linkStyle,
  sectionContainer, sectionTitle, standardButton,
  sectionContainerHeader, sectionTitleAlt, box, altBox } from '../styles/MyPostingsStyles.css'

export default function MyPostings ({ jobs, selectedJobId }) {

    return (
      <div className={rootSidebarOpenComponentContainer}>

        {/* My Postings Header */}
        <MyPostingsHeader page={"postings-open"} jobs={jobs} />

        {
          jobs.length === 0
            ? <div className={bodySectionNoJobs}>You don't have any open jobs yet. <Link className={linkStyle} to="/categories">Post your first job</Link> and we'll let you know when it's approved!</div>
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

              <div className={sectionContainer}>
                <div className={sectionContainerHeader}>
                  <div className={sectionTitleAlt}>APPLICANTS</div>
                  <div>
                    <button className={standardButton}>Go to applicants</button>
                  </div>
                </div>
                <JobApplicantsSummary maxApplicants={40} numPositions={20}/>
              </div>
              

              <div className={sectionContainer}>
                <div className={sectionContainerHeader}>
                  <div className={sectionTitleAlt}># OF POSITIONS</div>
                </div>
                <div className={box}>
                  This jobs has a total of 2 positions, 0 of which are currently filled.
                </div>
              </div>

              {
                /* ================================
                * INVITATIONS
                * ================================
                */
              }
              
              <div className={sectionContainer}>
                <div className={sectionContainerHeader}>
                  <div className={sectionTitle}>Invitations</div>
                </div>
                <JobInvitations students={[
                  {
                    profilePictureUrl: 'https://api.univjobs.ca/avatar/profilepicture-1502902338450.png',
                    name: "Khalil Stemmler",
                    school: 'Sheridan College',
                    applied: false
                  },
                  {
                    profilePictureUrl: 'https://api.univjobs.ca/avatar/profilepicture-1501633682826.png',
                    name: "Alysha O'Connor",
                    school: 'Sheridan College',
                    applied: true
                  },
                  {
                    profilePictureUrl: 'https://api.univjobs.ca/avatar/profilepicture-1501633682826.png',
                    name: "Alysha O'Connor",
                    school: 'Sheridan College',
                    applied: true
                  },
                  {
                    profilePictureUrl: 'https://api.univjobs.ca/avatar/profilepicture-1501633682826.png',
                    name: "Alysha O'Connor",
                    school: 'Sheridan College',
                    applied: true
                  },
                  {
                    profilePictureUrl: 'https://api.univjobs.ca/avatar/profilepicture-1501633682826.png',
                    name: "Alysha O'Connor",
                    school: 'Sheridan College',
                    applied: true
                  },
                  {
                    profilePictureUrl: 'https://api.univjobs.ca/avatar/profilepicture-1501633682826.png',
                    name: "Alysha O'Connor",
                    school: 'Sheridan College',
                    applied: true
                  },
                  {
                    profilePictureUrl: 'https://api.univjobs.ca/avatar/profilepicture-1501633682826.png',
                    name: "Alysha O'Connor",
                    school: 'Sheridan College',
                    applied: true
                  }
                ]}/>
              </div>

              {
                /* ================================
                * METRICS
                * ================================
                */
              }

              <div className={sectionContainer}>
                <div className={sectionContainerHeader}>
                  <div className={sectionTitle}>Metrics</div>
                </div>
                <JobMetrics/>
              </div>

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


