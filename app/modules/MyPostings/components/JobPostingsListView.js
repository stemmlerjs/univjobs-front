
import React, { PropTypes } from 'react'
import { container, header, jobRow, activeCircle, closedCircle, awaitingCircle,
  jobTitleStyle, jobTypeStyle } from '../styles/JobPostingsListView.css'

import ReactTooltip from 'react-tooltip'  
import { Link } from 'react-router'

export default function JobPostingsListView ({ jobs, page, handleChangeSelectedJob }) {


  return (
    <div className={container}>
      <div className={header}>
        {
          page === "open"
          ? 'All open jobs' :
          page === "closed"
          ? 'All closed jobs' :
          page === "awaiting" 
          ? 'All jobs awaiting review' :
          ''
        }
      </div>
      {
        jobs.map((job, index) => {
          return (
            <div className={jobRow} key={index}>
              <div className={page == "open" ? activeCircle : page == "closed" ? closedCircle : page == "awaiting" ? awaitingCircle : ''}>
                <i className={"fa fa-circle"} aria-hidden="true"></i>
              </div>
              <div>
                <div className={jobTitleStyle}  
                  data-jobid={job.job_id}
                  onClick={(e)=> {
                    handleChangeSelectedJob(e.target.getAttribute('data-jobid'))
                    }}>{job.title}</div>
                <div className={jobTypeStyle}>{
                      job.type === 1 
                      ? 'One Time Gig' :
                      job.type === 2 
                      ? 'Summer' :
                      job.type === 3 
                      ? 'Winter' :
                      job.type === 4
                      ? 'Freelance' :
                      job.type === 5
                      ? 'Campus Rep' :
                      job.type === 6
                      ? 'Part-time' :
                      job.type === 7 
                      ? 'Full-time' :
                      ''
                    }</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}


