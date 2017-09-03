
/*
 * RecentActivity
 * 
 */

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { recentActivityContainer, card, cardType1, cardType2, cardType3, cardType4, end, activityTime } from '../styles/RecentActivityStyles.css'

import { Link } from 'react-router'

export default function RecentActivity ({ activities }) {
  return (
    <div className={recentActivityContainer}>
      {
        activities.length == 0
          ? 'no activity'
          : <div>
              {
                activities.map((activity, index) => {
                  return (
                    <div className={activity.activityType === 1 || activity.activityType == 2 
                        ? `${card} ${cardType1}` 
                        : activity.activityType == 2
                          ? `${card} ${cardType2}` 
                          : activity.activityType == 3
                            ? `${card} ${cardType3}` 
                            : activity.activityType == 4
                              ? `${card} ${cardType4}` 
                              : ''
                    } key={index}>
                      { 
                        `
                          ${activity.activityType == 1 
                            ? `${activity.student_name} applied to `
                            :  activity.activityType == 2
                              ?  `${activity.student_name} accepted your invite to apply to `
                              : activity.activityType == 3
                                ? `Moved ${activity.student_name} into the contact pool for job `
                                : ''
                           }
                          
                          ${activity.title}.
                        ` 
                      }
                      <div className={activityTime}>less than 1 min ago.</div>
                    </div>
                  )
                })
              }
              
            </div>
      }
    </div>
  )
}


