
import React, { PropTypes } from 'react'
import { rootComponentContainer, margins } from 'sharedStyles/sharedComponentStyles.css'

import ReactTooltip from 'react-tooltip'

import MyApplicantsHeader from './MyApplicantsHeader'
import DashboardListItem from './DashboardListItem'
import RecentActivity from './RecentActivity'

import { Link } from 'react-router'

import { dashboardContainer, dashboardListContainer,
  smallHeader, dashboardColumnLeft, dashboardColumnRight, dashboardRecentActivityContainer } from '../styles/MyApplicantsDashboardStyles.css'

import { bodySectionNoJobs, linkStyle } from '../styles/MyApplicantsStyles.css'

  /*
  * Activity types
  * 
  * 1 == applied
  * 2 == accepted invite + applied
  * 3 == moved to contact
  * 4 == hired
  * 5 == rejected
  */

let activities = [
  {
    student_name: "Khalil Stemmler",
    job_id: 1,
    title: "Marking Associate",
    activityType: 1
  }, {
    student_name: "Asia Ferriera",
    job_id: 4,
    title: "Service Representative",
    activityType: 2
  }, {
    student_name: "Charles Javelona",
    job_id: 2,
    title: "Full-stack Web Developer",
    activityType: 1
  },{
    student_name: "Josh Homme",
    job_id: 5,
    title: "Dancer",
    activityType: 3
  },
];

export default function MyApplicantsDashboard ({ 
    jobs, 
    selectedJob,
    page,

    handleChangeSelectedJob
  }) {
    return (
      <div className={rootComponentContainer}>
        
        <MyApplicantsHeader jobs={jobs} selectedJob={selectedJob} page={page}/>

        {
          jobs.length == 0

            ? <div className={bodySectionNoJobs}>You don't have any jobs for students to apply to yet. 
                <Link className={linkStyle} to="/categories"> Post a new job</Link> to get started!</div>

            : <div className={dashboardContainer}>
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
                          <DashboardListItem key={index} job={job} 
                            handleChangeSelectedJob={handleChangeSelectedJob}/>
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
                  <RecentActivity activities={activities}/>
                </div>
              </div>
        }

      </div>
    )
}


