
import React, { PropTypes } from 'react'
import { rootComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import ReactTooltip from 'react-tooltip'

import MyApplicantsHeader from './MyApplicantsHeader'
import DashboardListItem from './DashboardListItem'
import { Link } from 'react-router'

import { dashboardContainer, dashboardListContainer,
  smallHeader, dashboardColumnLeft, dashboardColumnRight, dashboardRecentActivityContainer } from '../styles/MyApplicantsDashboardStyles.css'

export default function MyApplicantsDashboard ({ 
    jobs, 
    selectedJob
  }) {
    return (
      <div className={rootComponentContainer}>
        
        <MyApplicantsHeader jobs={jobs} selectedJob={selectedJob}/>

        <div className={dashboardContainer}>
          <div className={dashboardColumnLeft}>

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
                    <DashboardListItem key={index} job={job} />
                  )
                })
              }
            </div>
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
          <div className={dashboardColumnRight}>
            <div className={smallHeader}>Recent activity</div>
            <div className={dashboardRecentActivityContainer}></div>

          </div>
        </div>

      </div>
    )
}


