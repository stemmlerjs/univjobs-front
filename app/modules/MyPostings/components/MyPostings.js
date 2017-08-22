
import React, { PropTypes } from 'react'
import { rootSidebarOpenComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import JobDetails from './JobDetails'
import JobQuestions from './JobQuestions'

import { headerSection, bodySection, headerJobTitle, headerJobsSelectionContainer,
  headerNumberJobs, headerJobSelectButton, bodySectionColumn,
  sectionContainer, sectionTitle, standardButton,
  sectionContainerHeader } from '../styles/MyPostingsStyles.css'

export default function MyPostings ({}) {

    return (
      <div className={rootSidebarOpenComponentContainer}>

        <div className={headerSection}>
          <div className={headerJobTitle}>Marketing Street Team</div>
          <div className={headerJobsSelectionContainer}>
            <div className={headerNumberJobs}>9 open jobs</div>
            <div className={headerJobSelectButton}><i className={"fa fa-angle-down"} aria-hidden="true"></i></div>
          </div>
        </div>
        
        {
          /*
           * Body Section
           */
        }

        <div className={bodySection}>

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
                <div className={sectionTitle}>Metrics</div>
              </div>
            </div>

          </div>

        </div>
          
      </div>
    )
}


