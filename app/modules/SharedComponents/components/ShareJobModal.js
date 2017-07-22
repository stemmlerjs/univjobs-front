
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { cardModalContainer, letFriendsKnow, copyLink, jobTitleLink, jobCompany, visitJobPageLink } from '../styles/ShareJobModal.css'

import { SocialLinks } from 'modules/SharedComponents'

import config from 'config'
import moment from 'moment'

export default function ShareJobModal({ job }) { 
  return (
    <div className={cardModalContainer}>
      <div className={letFriendsKnow}>Let your friends know about this job</div>
      <div className={jobTitleLink}>{job.title}</div>
      <div className={jobCompany}>{job.company_name}</div>
      <SocialLinks
        jobTitle={job.title}
        responsibilities={job.responsibilities
      }/>
      <input id="share-job-target" className={copyLink} 
        value={config.baseUrl + "posting/" + job.job_id}
        type="text"/>
      
      <Link to={`/posting/${job.job_id}`}>
        <div className={visitJobPageLink}>VISIT PUBLIC JOB PAGE</div>
      </Link>

    </div>  
  )
}

