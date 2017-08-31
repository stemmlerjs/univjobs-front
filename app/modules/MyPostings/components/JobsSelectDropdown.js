
import React, { PropTypes } from 'react'
import { box, invisible, jobItem } from '../styles/JobsSelectDropdownStyles.css'

export default function JobsSelectDropdown ({ jobs, visible, handleChangeSelectedJob, currentJobId }) {
  return (
    <div className={visible ? box : `${box} ${invisible}`}>
      {
        jobs.map((job, index) => {
          if (job.job_id !== currentJobId) {
            return (
              <div 
                onClick={() => {
                  handleChangeSelectedJob(job.job_id)
                }} 
                className={jobItem} 
                key={index}>{job.title}
              </div>
            )
          }
        })
      }
    </div>
  )
}


