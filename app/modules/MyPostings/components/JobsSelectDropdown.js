
import React, { PropTypes } from 'react'
import { box, jobItem } from '../styles/JobsSelectDropdownStyles.css'

export default function JobsSelectDropdown ({ jobs, visible }) {

  return (
    <div className={box}>
      {
        jobs.map((job, index) => {
          return (
            <div className={jobItem} key={index}>{job.title}</div>
          )
        })
      }
    </div>
  )
}


