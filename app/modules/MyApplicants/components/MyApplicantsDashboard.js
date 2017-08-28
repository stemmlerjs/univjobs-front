
import React, { PropTypes } from 'react'
import { rootComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import ReactTooltip from 'react-tooltip'

import MyApplicantsHeader from './MyApplicantsHeader'
import { Link } from 'react-router'

import { dashboardListContainer, dashboardListItem, dashboardListItemHeader,
  smallHeader } from '../styles/MyApplicantsDashboardStyles.css'

export default function MyApplicantsDashboard ({ 
    jobs, 
    selectedJob
  }) {
    return (
      <div className={rootComponentContainer}>
        
        <MyApplicantsHeader jobs={jobs} selectedJob={selectedJob}/>

        {
          /*
           * [My Applicants Dashboard Jobs List Container]
           */
        }
        <div className={dashboardListContainer}>

          <div className={smallHeader}>Current open postings</div>

          {
            /*
             *  [My Applicants Dashboard Jobs List Item]
             */

            jobs.map((job, index) => {
              return (
                <div className={dashboardListItem} key={index}>
                  <div className={dashboardListItemHeader}>{job.title}</div>
                </div>
              )
            })
          }
        </div>
        
        {
          /*
           * PERHAPS on the right side here, we could use this space
           * to show recent activitiy, using moment JS like:
           *
           * Recent Activity
           *
           * - Khalil Stemmler applied to 'Marketing Associate' less than 10 mins ago.
           * - Bob Vance applied to 'Marketing Associate'
           * - You rejected candidates [2,4,5,22] from 'Marketing Associate'
           */
        }
        

      </div>
    )
}


